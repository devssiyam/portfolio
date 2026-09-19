import { useScrollThreshold } from '../hooks/useScrollThreshold';
import { useMediaQuery } from '../hooks/useMediaQuery';

export default function BackToTop() {
  const visible = useScrollThreshold(500);
  // Phase 19: prefers-reduced-motion -> instant jump, no smooth glide.
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

  return (
    <button
      className={`back-to-top${visible ? ' visible' : ''}`}
      id="backToTop"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' })}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" aria-hidden="true" focusable="false">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    </button>
  );
}
