import { useEffect, useState } from 'react';

/**
 * Returns true once window.scrollY exceeds `px`. Mirrors the original
 * "compare window.scrollY to a number" pattern used by the navbar
 * scrolled-state (module 3) and the back-to-top button (module 11).
 */
export function useScrollThreshold(px: number): boolean {
  const [past, setPast] = useState(() => (typeof window !== 'undefined' ? window.scrollY > px : false));

  useEffect(() => {
    function onScroll() {
      setPast(window.scrollY > px);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [px]);

  return past;
}
