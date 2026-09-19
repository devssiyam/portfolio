import { useEffect, useRef } from 'react';

/**
 * Exact extraction of initProgressBar() (module 15): same gradient, same
 * fixed positioning/z-index, same scroll-percent math. The original created
 * this via document.body.appendChild with inline cssText; here it's a real
 * component rendered in the tree instead, since a permanent DOM node
 * doesn't need manual insertion once React owns the tree.
 *
 * Phase 19 performance: the original wrote width% through React state on
 * every scroll event (re-render + per-frame layout) with a 0.1s width
 * transition. Now it writes transform: scaleX directly to the element via
 * ref — no re-renders, compositor-only, and the 1:1 scroll tracking makes
 * the transition unnecessary.
 */
export default function ScrollProgressBar() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onScroll() {
      const bar = barRef.current;
      if (!bar) return;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(window.scrollY / docHeight, 1) : 0;
      bar.style.transform = `scaleX(${progress})`;
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      ref={barRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '2px',
        // Phase 25: the accent colors via tokens — the only raw accent
        // literals left in the app (CSS is fully tokenized)
        background: 'linear-gradient(90deg, var(--accent), var(--accent-2))',
        zIndex: 9999,
        transformOrigin: 'left',
        transform: 'scaleX(0)',
        pointerEvents: 'none',
      }}
    />
  );
}
