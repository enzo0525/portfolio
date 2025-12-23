'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

/**
 * SpotlightBackground - Mouse-tracking spotlight effect overlay
 *
 * Creates a subtle radial gradient that follows the cursor, blending with
 * background elements. Automatically disables on mobile and for users with
 * reduced motion preferences.
 *
 * @example
 * <SpotlightBackground accentColor="accent-blue" opacity={0.15}>
 *   <div className="grid-bg" />
 * </SpotlightBackground>
 */

interface SpotlightBackgroundProps {
  /** Base background component/classes to render beneath spotlight */
  children?: React.ReactNode;
  /** Spotlight radius in pixels (default: 550) */
  spotlightSize?: number;
  /** Spotlight color from CSS custom properties (default: 'accent-blue') */
  accentColor?: 'accent-primary' | 'accent-blue' | 'accent-blue-light';
  /** Opacity of the spotlight effect (0-1, default: 0.15) */
  opacity?: number;
  /** Enable smooth easing/lag for more polished feel (default: true) */
  enableSmoothing?: boolean;
  /** Smoothing factor for mouse tracking (0-1, higher = more lag, default: 0.15) */
  smoothingFactor?: number;
  /** Disable spotlight on mobile/touch devices (default: true) */
  disableOnMobile?: boolean;
  /** Additional className for container */
  className?: string;
}

const ACCENT_COLORS = {
  'accent-primary': 'rgba(6, 182, 212, var(--spotlight-opacity))', // #06b6d4 (cyan-500)
  'accent-blue': 'rgba(103, 232, 249, var(--spotlight-opacity))', // #67e8f9 (cyan-300)
  'accent-blue-light': 'rgba(165, 243, 252, var(--spotlight-opacity))', // #a5f3fc (cyan-200)
} as const;

export function SpotlightBackground({
  children,
  spotlightSize = 550,
  accentColor = 'accent-blue',
  opacity = 0.15,
  enableSmoothing = true,
  smoothingFactor = 0.15,
  disableOnMobile = true,
  className,
}: SpotlightBackgroundProps): JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const targetPosition = useRef({ x: 0, y: 0 });
  const currentPosition = useRef({ x: 0, y: 0 });
  const lastMouseEvent = useRef<{ clientX: number; clientY: number } | null>(null);

  const [isActive, setIsActive] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      return;
    }

    // Check for mobile/touch devices
    if (disableOnMobile && ('ontouchstart' in window || navigator.maxTouchPoints > 0)) {
      return;
    }

    setIsActive(true);

    const container = containerRef.current;
    if (!container) return;

    // Handle mouse move - listen on window to track even over z-indexed elements
    const handleMouseMove = (e: MouseEvent): void => {
      lastMouseEvent.current = { clientX: e.clientX, clientY: e.clientY };
      const rect = container.getBoundingClientRect();
      targetPosition.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    // Handle scroll - update position when container moves (e.g., trackpad scroll)
    const handleScroll = (): void => {
      if (!lastMouseEvent.current) return;

      const rect = container.getBoundingClientRect();
      targetPosition.current = {
        x: lastMouseEvent.current.clientX - rect.left,
        y: lastMouseEvent.current.clientY - rect.top,
      };
    };

    // Handle touch move (if enabled on mobile)
    const handleTouchMove = (e: TouchEvent): void => {
      if (disableOnMobile) return;
      const touch = e.touches[0];
      if (!touch) return;

      const rect = container.getBoundingClientRect();
      targetPosition.current = {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top,
      };
    };

    // RAF animation loop
    const updateSpotlightPosition = (): void => {
      if (!container) return;

      if (enableSmoothing) {
        // Lerp for smooth easing
        currentPosition.current.x +=
          (targetPosition.current.x - currentPosition.current.x) * smoothingFactor;
        currentPosition.current.y +=
          (targetPosition.current.y - currentPosition.current.y) * smoothingFactor;
      } else {
        // Direct position update
        currentPosition.current = { ...targetPosition.current };
      }

      // Update CSS custom properties
      container.style.setProperty('--mouse-x', `${currentPosition.current.x}px`);
      container.style.setProperty('--mouse-y', `${currentPosition.current.y}px`);

      rafRef.current = requestAnimationFrame(updateSpotlightPosition);
    };

    // Set up CSS custom properties
    container.style.setProperty('--spotlight-size', `${spotlightSize}px`);
    container.style.setProperty('--spotlight-opacity', opacity.toString());
    container.style.setProperty('--spotlight-color', ACCENT_COLORS[accentColor]);

    // Add event listeners to window to track mouse even over z-indexed elements
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Start RAF loop
    rafRef.current = requestAnimationFrame(updateSpotlightPosition);

    // Cleanup
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [
    spotlightSize,
    accentColor,
    opacity,
    enableSmoothing,
    smoothingFactor,
    disableOnMobile,
  ]);

  return (
    <div
      ref={containerRef}
      className={cn('absolute inset-0', className)}
    >
      {/* Spotlight overlay */}
      {isActive && isMounted && (
        <div
          className={cn(
            'absolute inset-0 pointer-events-none transition-opacity duration-600 ease-out',
            'opacity-0',
            isMounted && 'opacity-100'
          )}
          style={{
            willChange: 'transform',
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(
                circle var(--spotlight-size) at var(--mouse-x) var(--mouse-y),
                var(--spotlight-color) 0%,
                transparent 70%
              )`,
              mixBlendMode: 'lighten',
              transform: 'translate3d(0, 0, 0)',
            }}
          />
        </div>
      )}

      {/* Children (grid background, etc.) */}
      {children}
    </div>
  );
}
