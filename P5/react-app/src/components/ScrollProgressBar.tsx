import { useEffect, useState } from 'react';

/**
 * Exact extraction of initProgressBar() (module 15): same gradient, same
 * fixed positioning/z-index, same scroll-percent math. The original created
 * this via document.body.appendChild with inline cssText; here it's a real
 * component rendered in the tree instead, since a permanent DOM node
 * doesn't need manual insertion once React owns the tree.
 */
export default function ScrollProgressBar() {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    function onScroll() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setPercent(Math.min(scrollPercent, 100));
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: '2px',
        background: 'linear-gradient(90deg, #3B82F6, #8B5CF6)',
        zIndex: 9999,
        width: `${percent}%`,
        transition: 'width 0.1s ease',
        pointerEvents: 'none',
      }}
    />
  );
}
