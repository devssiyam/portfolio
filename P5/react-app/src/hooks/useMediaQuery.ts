import { useEffect, useState } from 'react';

/**
 * Reactive matchMedia hook. Replaces the three separate
 * `window.matchMedia('(max-width: 768px)').matches` one-shot checks in the
 * original script.js (cursor's own 768px CSS gate, card tilt module #14, and
 * orb parallax module #17) with one source of truth for the literal 768.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia(query).matches : false,
  );

  useEffect(() => {
    const mql = window.matchMedia(query);
    function handler(e: MediaQueryListEvent) {
      setMatches(e.matches);
    }
    setMatches(mql.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, [query]);

  return matches;
}
