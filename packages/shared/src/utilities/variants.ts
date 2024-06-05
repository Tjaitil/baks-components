import type { ThemeVariant } from '../types/ThemeVariants';

export function resolveVariant(variant: ThemeVariant = 'primary'): string {
  return `bk-${variant}`;
}

export const variantsOptions: Array<ThemeVariant> = [
  'primary',
  'secondary',
  'dark',
  'light',
  'info',
  'warning',
  'success',
  'error'
];
