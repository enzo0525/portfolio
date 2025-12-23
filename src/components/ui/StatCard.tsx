import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string;
  icon?: LucideIcon;
  className?: string;
}

export function StatCard({ label, value, icon: Icon, className }: StatCardProps) {
  return (
    <div
      className={cn(
        'rounded-xl bg-background-secondary border border-border p-6',
        'hover:border-border-light transition-all duration-300',
        'flex flex-col gap-2',
        className
      )}
    >
      {Icon && (
        <Icon className="w-5 h-5 text-accent-primary mb-2" />
      )}
      <div className="text-3xl md:text-4xl font-bold text-foreground">
        {value}
      </div>
      <div className="text-sm text-foreground-secondary">
        {label}
      </div>
    </div>
  );
}
