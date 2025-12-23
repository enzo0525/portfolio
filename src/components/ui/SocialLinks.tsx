import Link from 'next/link';
import { Github, Linkedin, Mail } from 'lucide-react';
import { personal } from '@/data/personal';
import { cn } from '@/lib/utils';

interface SocialLinksProps {
  className?: string;
  iconSize?: number;
  variant?: 'default' | 'compact';
}

const ICON_SIZE_DEFAULT = 20;

export function SocialLinks({
  className,
  iconSize = ICON_SIZE_DEFAULT,
  variant = 'default'
}: SocialLinksProps) {
  const linkClass = cn(
    'text-foreground-secondary hover:text-accent-primary transition-colors',
    variant === 'default' && 'p-3 rounded-lg bg-background-secondary hover:bg-background-tertiary border border-border hover:border-border-light transition-all'
  );

  return (
    <div className={cn('flex items-center gap-4', className)}>
      <Link
        href={personal.social.github}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClass}
        aria-label="GitHub"
      >
        <Github size={iconSize} className={variant === 'compact' ? '' : 'text-foreground-secondary'} />
      </Link>
      <Link
        href={personal.social.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClass}
        aria-label="LinkedIn"
      >
        <Linkedin size={iconSize} className={variant === 'compact' ? '' : 'text-foreground-secondary'} />
      </Link>
      <Link
        href={`mailto:${personal.email}`}
        className={linkClass}
        aria-label="Email"
      >
        <Mail size={iconSize} className={variant === 'compact' ? '' : 'text-foreground-secondary'} />
      </Link>
    </div>
  );
}
