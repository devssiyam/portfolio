import { useCallback, useEffect, useRef } from 'react';

/**
 * Recreates the original `checkAOS()` global scroll-reveal scanner (module 7)
 * exactly: same 80px threshold, same data-aos-delay read, same class name
 * ('aos-animate') added via a scanned pass rather than a per-element
 * IntersectionObserver. Kept as one global scanner (not a per-element
 * useInView) because MIGRATION-PLAN.md §5/§6.3 flags that checkAOS() is
 * timing-coupled to the loader and that coupling must be preserved exactly.
 *
 * Returns a `runCheck` function so App can trigger the first pass
 * (on mount + on window 'load'), exactly as `initLoader` called
 * `checkAOS()` directly in the original (the loader itself is gone
 * — Phase 26).
 *
 * Phase 22 performance (behavior-identical, less per-frame work):
 *  - the [data-aos] list is cached on first scan — the DOM is static (every
 *    section mounts at App mount), so re-running querySelectorAll on the
 *    whole document on every scroll frame was pure waste;
 *  - already-revealed elements are skipped (the class is never removed),
 *    so getBoundingClientRect() is only called for elements that can still
 *    change;
 *  - once every element has been revealed the scan can never produce
 *    another change, so the scroll/resize listeners detach for good.
 */
export function useAosReveal() {
  const rafRef = useRef<number | null>(null);
  const elementsRef = useRef<HTMLElement[] | null>(null);
  const stopListeningRef = useRef<() => void>(() => {});

  const runCheck = useCallback(() => {
    if (!elementsRef.current) {
      elementsRef.current = Array.from(
        document.querySelectorAll<HTMLElement>('[data-aos]'),
      );
    }
    const elements = elementsRef.current;
    const windowHeight = window.innerHeight;
    const threshold = 80;

    elements.forEach((el) => {
      if (el.classList.contains('aos-animate')) return;
      const rect = el.getBoundingClientRect();
      if (rect.top < windowHeight - threshold) {
        const delay = el.getAttribute('data-aos-delay') || '0';
        window.setTimeout(() => {
          el.classList.add('aos-animate');
        }, parseInt(delay, 10));
      }
    });

    // Everything revealed -> nothing left to scan; detach for good.
    if (elements.every((el) => el.classList.contains('aos-animate'))) {
      stopListeningRef.current();
    }
  }, []);

  useEffect(() => {
    // Phase 19: rAF-throttle the scan — scroll events fire at the
    // display refresh rate; at most one DOM scan per frame now
    // (the initial/loader-triggered runCheck() path is unchanged).
    function onScrollOrResize() {
      if (rafRef.current !== null) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        runCheck();
      });
    }
    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize, { passive: true });
    stopListeningRef.current = () => {
      window.removeEventListener('scroll', onScrollOrResize);
      window.removeEventListener('resize', onScrollOrResize);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      stopListeningRef.current = () => {};
    };
    return () => {
      stopListeningRef.current();
    };
  }, [runCheck]);

  return runCheck;
}
