/**
 * Valida nombres de recursos cloud (buckets, instancias, etc.).
 * Reglas: debe iniciar con una letra minúscula, solo puede contener
 * letras minúsculas, números y guiones, y tener máximo 24 caracteres.
 */
export function isValidResourceName(name: string): boolean {
  const regex = /^[a-z][a-z0-9-]{0,23}$/;
  return regex.test(name);
}
