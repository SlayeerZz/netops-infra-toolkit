/**
 * Valida bloques CIDR usados para definir subredes en la infraestructura cloud.
 * Ejemplo válido: "10.0.1.0/24"
 */
export function isValidCidr(cidr: string): boolean {
  const cidrRegex = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})\/(\d{1,2})$/;
  const match = cidr.match(cidrRegex);
  if (!match) return false;

  const octets = [match[1], match[2], match[3], match[4]].map(Number);
  const prefix = Number(match[5]);

  const octetsValid = octets.every((o) => o >= 0 && o <= 255);
  const prefixValid = prefix >= 0 && prefix <= 32;

  return octetsValid && prefixValid;
}
