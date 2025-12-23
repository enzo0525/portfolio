import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: string;
  color?: 'green' | 'yellow' | 'red' | 'blue';
  className?: string;
}

const colorVariants = {
  green: 'bg-green-500/20 text-green-400 border-green-400/50 shadow-lg shadow-green-500/50',
  yellow: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/30',
  red: 'bg-red-500/10 text-red-500 border-red-500/30',
  blue: 'bg-accent-blue/10 text-accent-blue border-accent-blue/30',
};

const dotColors = {
  green: 'bg-green-400 shadow-sm shadow-green-400',
  yellow: 'bg-yellow-500',
  red: 'bg-red-500',
  blue: 'bg-accent-blue',
};

export function StatusBadge({ status, color = 'green', className }: StatusBadgeProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-2 px-3 py-1.5 rounded-full border font-medium text-sm',
        colorVariants[color],
        className
      )}
    >
      <span className={cn('w-2 h-2 rounded-full animate-pulse', dotColors[color])} />
      {status}
    </div>
  );
}
