import { useEffect } from 'react';

/**
 * Exact extraction of initSmoothScroll() (module 12): intercepts clicks on
 * any in-page anchor, skips bare '#' hrefs, offsets by --nav-height (same
 * fallback of 70 if the CSS var isn't readable). The original attached one
 * listener per anchor at load time; this uses a single delegated document
 * listener instead, since React re-renders anchors and a one-time
 * querySelectorAll pass would miss any added after mount — same resulting
 * behavior, safer against the component tree's dynamic nature.
 */
export function useSmoothScroll() {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (!href || href === '#') return;

      const el = document.querySelector(href);
      if (!el) return;

      e.preventDefault();
      const navHeight =
        parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) || 70;

      const targetTop = el.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({ top: targetTop, behavior: 'smooth' });
    }

    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);
}
