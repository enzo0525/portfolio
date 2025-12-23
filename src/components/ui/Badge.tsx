import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'primary' | 'blue' | 'brown' | 'teal';
  size?: 'sm' | 'md';
}

const variants = {
  default: 'bg-background-tertiary text-foreground-secondary border-border',
  primary: 'bg-accent-primary/10 text-accent-primary border-accent-primary/30',
  blue: 'bg-accent-blue/10 text-accent-blue border-accent-blue/30',
  brown: 'bg-accent-brown/10 text-accent-brown border-accent-brown/30',
  teal: 'bg-accent-teal/10 text-accent-teal border-accent-teal/30',
};

const sizes = {
  sm: 'px-2 py-1 text-xs',
  md: 'px-3 py-1.5 text-sm',
};

export function Badge({
  children,
  className,
  variant = 'default',
  size = 'md'
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border font-medium',
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </span>
  );
}
