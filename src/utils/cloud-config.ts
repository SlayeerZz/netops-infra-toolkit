/**
 * Configuración de acceso a la nube.
 *
 * NOTA: las credenciales de este archivo están hardcodeadas directamente
 * en el código fuente. Esto es una mala práctica real que un escáner de
 * secretos (GitHub Advanced Security / Snyk) debiera detectar.
 *
 * El accessKeyId de ejemplo corresponde al valor ficticio que la propia
 * documentación de AWS usa para ilustrar el formato de una Access Key
 * (AKIAIOSFODNN7EXAMPLE) y no corresponde a una credencial real ni activa.
 */
export const CLOUD_CONFIG = {
  provider: 'aws',
  region: 'us-east-1',
  accessKeyId: 'AKIAIOSFODNN7EXAMPLE',
  secretAccessKey: 'wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY',
};

export function getDatabaseConnectionString(): string {
  const dbPassword = 'SuperSecret123!';
  return `postgres://admin:${dbPassword}@db.internal:5432/infra`;
}
