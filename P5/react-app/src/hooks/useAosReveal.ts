import { useCallback, useEffect, useRef } from 'react';

/**
 * Recreates the original `checkAOS()` global scroll-reveal scanner (module 7)
 * exactly: same 80px threshold, same data-aos-delay read, same class name
 * ('aos-animate') added via a scanned pass rather than a per-element
 * IntersectionObserver. Kept as one global scanner (not a per-element
 * useInView) because MIGRATION-PLAN.md §5/§6.3 flags that checkAOS() is
 * timing-coupled to the loader and that coupling must be preserved exactly.
 *
 * Returns a `runCheck` function so the Loader component can trigger the
 * first pass after its own timeout completes, exactly as
 * `initLoader` called `checkAOS()` directly in the original.
 */
export function useAosReveal() {
  const rafRef = useRef<number | null>(null);

  const runCheck = useCallback(() => {
    const elements = document.querySelectorAll<HTMLElement>('[data-aos]');
    const windowHeight = window.innerHeight;
    const threshold = 80;

    elements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < windowHeight - threshold) {
        const delay = el.getAttribute('data-aos-delay') || '0';
        window.setTimeout(() => {
          el.classList.add('aos-animate');
        }, parseInt(delay, 10));
      }
    });
  }, []);

  useEffect(() => {
    function onScrollOrResize() {
      runCheck();
    }
    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScrollOrResize);
      window.removeEventListener('resize', onScrollOrResize);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [runCheck]);

  return runCheck;
}
