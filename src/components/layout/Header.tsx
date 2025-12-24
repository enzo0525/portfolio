"use client";

import { useState, useEffect } from "react";
import { Container } from "@/components/ui/Container";
import { NAV_ITEMS } from "@/lib/constants";
import { SCROLL_THRESHOLD, ICON_SIZES } from "@/lib/ui-constants";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > SCROLL_THRESHOLD);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-background/95 backdrop-blur-sm border-b border-border shadow-lg" : "bg-transparent"
      )}>
      <Container>
        <nav className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
            <Image src="/images/e_logo.png" alt="logo" width={50} height={50} priority />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <Link key={item.href} href={item.href} className="text-foreground-secondary hover:text-foreground transition-colors">
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-foreground" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="Toggle menu">
            {isMobileMenuOpen ? <X size={ICON_SIZES.lg} /> : <Menu size={ICON_SIZES.lg} />}
          </button>
        </nav>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-foreground-secondary hover:text-foreground transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </Container>
    </header>
  );
}
