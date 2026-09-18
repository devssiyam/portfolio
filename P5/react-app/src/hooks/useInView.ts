import { useEffect, useRef, useState } from 'react';

/**
 * Fires once when the observed element enters the viewport, then disconnects.
 * Used by SkillCard and Stats to trigger the bar-fill / count-up animations,
 * consolidating modules 8/9/16 (which each re-implemented their own
 * "has this run yet" scroll check) into one reusable hook per
 * MIGRATION-PLAN.md §5.
 */
export function useInView<T extends HTMLElement>(threshold = 0.1) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}
