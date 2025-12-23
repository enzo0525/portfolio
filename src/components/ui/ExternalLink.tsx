import Link from 'next/link';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ExternalLinkProps {
  href: string;
  children: React.ReactNode;
  icon?: LucideIcon;
  iconSize?: number;
  className?: string;
}

const ICON_SIZE_DEFAULT = 16;

export function ExternalLink({
  href,
  children,
  icon: Icon,
  iconSize = ICON_SIZE_DEFAULT,
  className
}: ExternalLinkProps) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'flex items-center gap-2 text-sm text-foreground-secondary hover:text-accent-primary transition-colors',
        className
      )}
    >
      {Icon && <Icon size={iconSize} />}
      {children}
    </Link>
  );
}
