
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const raiz = path.resolve(__dirname, '..');
const carpetaCobertura = path.join(raiz, 'coverage');

fs.mkdirSync(carpetaCobertura, { recursive: true });

console.log('\n=== ANALISIS DE PRUEBAS NETOPS ===\n');

// 1. Ejecutar Jest y generar reportes
const resultado = spawnSync(
  process.execPath,
  [
    require.resolve('jest/bin/jest'),
    '--coverage',
    '--runInBand',
    '--json',
    '--outputFile=coverage/test-results.json',
    '--coverageReporters=text',
    '--coverageReporters=json',
    '--coverageReporters=json-summary',
    '--coverageReporters=html',
    '--coverageReporters=lcov'
  ],
  { cwd: raiz, stdio: 'inherit' }
);

// 2. Identificar pruebas fallidas
console.log('\n=== PRUEBAS FALLIDAS ===');

const archivoPruebas = path.join(
  carpetaCobertura, 'test-results.json'
);

if (fs.existsSync(archivoPruebas)) {
  const pruebas = JSON.parse(
    fs.readFileSync(archivoPruebas, 'utf8')
  );

  let fallidas = 0;

  for (const suite of pruebas.testResults || []) {
    for (const prueba of suite.assertionResults || []) {
      if (prueba.status === 'failed') {
        fallidas++;
        console.log(`Prueba: ${prueba.fullName}`);
        console.log(`Archivo: ${path.relative(raiz, suite.name)}`);
      }
    }
  }

  console.log(`Total de pruebas fallidas: ${fallidas}`);
} else {
  console.log('No se pudo leer el reporte de pruebas.');
}

// 3. Mostrar cobertura general
console.log('\n=== COBERTURA GENERAL ===');

const archivoResumen = path.join(
  carpetaCobertura, 'coverage-summary.json'
);

if (fs.existsSync(archivoResumen)) {
  const resumen = JSON.parse(
    fs.readFileSync(archivoResumen, 'utf8')
  );

  for (const tipo of ['lines', 'statements', 'functions', 'branches']) {
    console.log(`${tipo}: ${resumen.total[tipo].pct}%`);
  }

  // 4. Mostrar archivos con cobertura incompleta
  console.log('\n=== ARCHIVOS CON COBERTURA INCOMPLETA ===');

  const archivoDetalle = path.join(
    carpetaCobertura, 'coverage-final.json'
  );

  const detalles = fs.existsSync(archivoDetalle)
    ? JSON.parse(fs.readFileSync(archivoDetalle, 'utf8'))
    : {};

  for (const [nombre, metricas] of Object.entries(resumen)) {
    if (nombre === 'total') continue;

    const relativo = path.relative(raiz, nombre);

    if (!relativo.startsWith(`src${path.sep}`)) continue;
    if (metricas.lines.pct === 100 &&
        metricas.functions.pct === 100) continue;

    console.log(`\nArchivo: ${relativo}`);
    console.log(`Cobertura de lineas: ${metricas.lines.pct}%`);
    console.log(`Cobertura de funciones: ${metricas.functions.pct}%`);

    const detalle = detalles[nombre];

    if (detalle) {
      const lineas = new Set();

      for (const [id, veces] of Object.entries(detalle.s || {})) {
        if (veces === 0) {
          const linea = detalle.statementMap[id]?.start?.line;
          if (linea !== undefined) lineas.add(linea);
        }
      }

      const funciones = [];

      for (const [id, veces] of Object.entries(detalle.f || {})) {
        if (veces === 0) {
          funciones.push(detalle.fnMap[id]?.name || id);
        }
      }

      console.log(
        'Inicio de sentencias no cubiertas: ' +
        ([...lineas].sort((a, b) => a - b).join(', ') || 'Ninguna')
      );

      console.log(
        'Funciones no cubiertas: ' +
        (funciones.join(', ') || 'Ninguna')
      );
    }
  }
} else {
  console.log('No se encontro el reporte de cobertura.');
}

console.log('\n=== ANALISIS FINALIZADO ===');
console.log('Reporte HTML: coverage/lcov-report/index.html');

if (resultado.error) {
  console.error(resultado.error.message);
}

process.exitCode = resultado.status ?? 1;
