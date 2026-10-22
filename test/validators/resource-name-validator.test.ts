import { isValidResourceName } from '../../src/validators/resource-name-validator';

describe('isValidResourceName', () => {
  it('acepta un nombre válido en minúsculas con guiones', () => {
    expect(isValidResourceName('web-server-01')).toBe(true);
  });

  it('rechaza un nombre que comienza con un número', () => {
    expect(isValidResourceName('1-web-server')).toBe(false);
  });

  it('rechaza un nombre con mayúsculas', () => {
    expect(isValidResourceName('WebServer')).toBe(false);
  });

  it('rechaza un nombre que termina en guion', () => {
    // Los proveedores cloud (ej. buckets S3) no permiten nombres
    // que terminen en guion. Este caso debiera fallar.
    expect(isValidResourceName('web-server-')).toBe(false);
  });
});
