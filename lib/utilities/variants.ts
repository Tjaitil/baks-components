import type { ThemeVariant } from '@/types/ThemeVariants';

export function resolveVariant(variant: ThemeVariant = 'primary', element: string) {
  return `bk-${variant}`;
}

export const variants: Array<ThemeVariant> = [
  'primary',
  'secondary',
  'dark',
  'light',
  'info',
  'warning',
  'success',
  'error'
];
