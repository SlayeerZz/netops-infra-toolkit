import { exec } from 'child_process';

/**
 * Ejecuta un respaldo del directorio de datos de un servidor.
 *
 * NOTA: esta función concatena directamente parámetros de entrada dentro
 * de un comando de shell. Un análisis de seguridad de código estático
 * (SAST) debiera marcar esto como una vulnerabilidad de inyección de
 * comandos (OS Command Injection).
 */
export function runBackupScript(serverName: string, destinationPath: string): void {
  const command = `tar -czf ${destinationPath}/${serverName}-backup.tar.gz /var/data/${serverName}`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error al respaldar ${serverName}: ${error.message}`);
      return;
    }
    console.log(stdout);
  });
}
