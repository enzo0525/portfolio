import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className, hover = true }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-xl bg-background-secondary border border-border p-6',
        'shadow-lg shadow-black/20',
        hover && 'transition-all duration-300 hover:border-border-light hover:shadow-xl hover:shadow-black/30 hover:-translate-y-1',
        className
      )}
    >
      {children}
    </div>
  );
}
