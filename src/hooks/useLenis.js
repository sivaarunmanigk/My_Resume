import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

let lenisInstance = null;

/**
 * Initialise and return the global Lenis smooth scroll instance.
 * Call once at the App root level.
 */
export function useLenis() {
  const rafRef = useRef(null);

  useEffect(() => {
    // Respect reduced-motion preference
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    lenisInstance = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      infinite: false,
    });

    function raf(time) {
      lenisInstance.raf(time);
      rafRef.current = requestAnimationFrame(raf);
    }
    rafRef.current = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafRef.current);
      lenisInstance?.destroy();
      lenisInstance = null;
    };
  }, []);

  return lenisInstance;
}

/** Access the Lenis instance from anywhere (after App mounts). */
export function getLenis() {
  return lenisInstance;
}
