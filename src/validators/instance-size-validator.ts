/**
 * Valida y estima costos para los tamaños de instancia permitidos
 * en los ambientes de NetOps Solutions.
 */
export type InstanceSize = 'small' | 'medium' | 'large' | 'xlarge';

const ALLOWED_SIZES: InstanceSize[] = ['small', 'medium', 'large', 'xlarge'];

const MONTHLY_COST_USD: Record<InstanceSize, number> = {
  small: 10,
  medium: 25,
  large: 50,
  xlarge: 100,
};

export function isValidInstanceSize(size: string): size is InstanceSize {
  return ALLOWED_SIZES.includes(size as InstanceSize);
}

export function estimateMonthlyCost(size: InstanceSize): number {
  return MONTHLY_COST_USD[size];
}
