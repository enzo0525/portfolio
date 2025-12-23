export const FORM_FIELD_BASE_STYLES = [
  'w-full px-4 py-3 rounded-lg',
  'bg-background-secondary border border-border',
  'text-foreground placeholder:text-foreground-muted',
  'focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-transparent',
  'transition-colors duration-200',
] as const;

export const FORM_LABEL_STYLES = 'block text-sm font-medium text-foreground mb-2';
export const FORM_ERROR_STYLES = 'mt-1 text-sm text-red-500';
export const FORM_FIELD_ERROR_STYLES = 'border-red-500 focus:ring-red-500';
