import Link from "next/link";

interface BackLinkProps {
  href: string;
  label: string;
}

export function BackLink({ href, label }: BackLinkProps) {
  return (
    <Link href={href} className="text-text-muted mb-8 inline-block">
      ← {label}
    </Link>
  );
}
