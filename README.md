# NetOps Infra Toolkit

Conjunto de utilidades TypeScript para validar y automatizar tareas de
infraestructura cloud de **NetOps Solutions**: validación de bloques CIDR,
nombres de recursos, tamaños de instancia permitidos, y scripts de apoyo
para operaciones (respaldo, configuración de acceso a la nube).

## Instalación

```bash
npm install
```

## Ejecutar las pruebas unitarias

```bash
npm test
```

## Ejecutar las pruebas con cobertura

```bash
npm run test:coverage
```

## Estructura del proyecto

```
src/
  validators/
    cidr-validator.ts
    resource-name-validator.ts
    instance-size-validator.ts
  utils/
    backup-runner.ts
    cloud-config.ts
test/
  validators/
    cidr-validator.test.ts
    resource-name-validator.test.ts
```
