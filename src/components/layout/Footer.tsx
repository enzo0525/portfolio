import { Container } from '@/components/ui/Container';
import { SocialLinks } from '@/components/ui/SocialLinks';
import { personal } from '@/data/personal';
import { ArrowUp } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="py-12 border-t border-border">
      <Container>
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <p className="text-foreground-secondary">
              &copy; {new Date().getFullYear()} {personal.name}. All rights reserved.
            </p>
            <p className="text-sm text-foreground-muted mt-1">
              Built with Next.js, TypeScript, and Tailwind CSS
            </p>
          </div>

          <SocialLinks variant="compact" iconSize={20} />

          <Link
            href="#"
            className="text-foreground-secondary hover:text-accent-primary transition-colors flex items-center gap-2"
            aria-label="Back to top"
          >
            <ArrowUp size={20} />
            <span className="text-sm">Back to top</span>
          </Link>
        </div>
      </Container>
    </footer>
  );
}
