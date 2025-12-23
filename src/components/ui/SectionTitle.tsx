import { cn } from "@/lib/utils";

interface SectionTitleProps {
  children: React.ReactNode;
  className?: string;
}

export function SectionTitle({ children, className }: SectionTitleProps) {
  return (
    <div className={cn("space-y-4", className)}>
      <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
        {children}
        <div className="h-1 w-20 bg-linear-to-r from-cyan-400 to-white rounded-full mt-4" />
      </h2>
    </div>
  );
}
