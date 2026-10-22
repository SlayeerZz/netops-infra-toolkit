import { isValidCidr } from '../../src/validators/cidr-validator';

describe('isValidCidr', () => {
  it('acepta un CIDR válido con prefijo /24', () => {
    expect(isValidCidr('10.0.1.0/24')).toBe(true);
  });

  it('acepta un CIDR válido con prefijo /16', () => {
    expect(isValidCidr('192.168.0.0/16')).toBe(true);
  });

  it('rechaza un CIDR sin prefijo', () => {
    expect(isValidCidr('10.0.1.0')).toBe(false);
  });

  it('rechaza un CIDR con un octeto fuera de rango', () => {
    expect(isValidCidr('10.0.1.300/24')).toBe(false);
  });

  it('rechaza un CIDR con prefijo fuera de rango', () => {
    expect(isValidCidr('10.0.1.0/33')).toBe(false);
  });

  it('rechaza un texto que no tiene formato de IP', () => {
    expect(isValidCidr('no-es-una-ip')).toBe(false);
  });
});
