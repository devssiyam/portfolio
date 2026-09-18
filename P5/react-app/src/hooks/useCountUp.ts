import { useCallback, useRef, useState } from 'react';

/**
 * Exact extraction of the counting math in the original `animateCounter()`
 * (module 9): start at 0, step = target / (duration / 16), rAF loop until
 * start >= target, then snap to target. Duration defaults to 1800ms, same
 * as the original.
 */
export function useCountUp(target: number, duration = 1800) {
  const [value, setValue] = useState(0);
  const rafRef = useRef<number | null>(null);
  const startedRef = useRef(false);

  const start = useCallback(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    let current = 0;
    const step = target / (duration / 16);

    function count() {
      current += step;
      if (current < target) {
        setValue(Math.floor(current));
        rafRef.current = requestAnimationFrame(count);
      } else {
        setValue(target);
      }
    }
    count();
  }, [target, duration]);

  const cleanup = useCallback(() => {
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
  }, []);

  return { value, start, cleanup };
}
