import { useCallback, useSyncExternalStore } from 'react';

/**
 * Reactive matchMedia hook. Replaces the three separate
 * `window.matchMedia('(max-width: 768px)').matches` one-shot checks in
 * the original script.js (cursor's own 768px CSS gate, card tilt module
 * #14, and orb parallax module #17) with one source of truth.
 *
 * Phase 19: rewritten on useSyncExternalStore — the previous
 * setState-in-effect pattern triggered the react(set-state-in-effect)
 * lint warning (the last of the three pre-existing ones). Same
 * subscription behavior, clean render derivation.
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mql = window.matchMedia(query);
      mql.addEventListener('change', onChange);
      return () => mql.removeEventListener('change', onChange);
    },
    [query],
  );
  const getSnapshot = useCallback(() => window.matchMedia(query).matches, [query]);
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
