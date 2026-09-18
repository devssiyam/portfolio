import { useEffect, useState } from 'react';

interface LoaderProps {
  onComplete: () => void;
}

/**
 * Recreates initLoader() (module 1) exactly: blocks body scroll immediately,
 * waits for window 'load', then after an 1800ms timeout marks itself done,
 * restores scroll, and calls onComplete — which App wires to the same
 * first-pass checkAOS() call the original made directly.
 */
export default function Loader({ onComplete }: LoaderProps) {
  const [done, setDone] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    let timeoutId: number;
    function handleLoad() {
      timeoutId = window.setTimeout(() => {
        setDone(true);
        document.body.style.overflow = '';
        onComplete();
      }, 1800);
    }

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
    }

    return () => {
      window.removeEventListener('load', handleLoad);
      if (timeoutId) window.clearTimeout(timeoutId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div id="loader" className={`loader${done ? ' done' : ''}`}>
      <div className="loader__inner">
        <div className="loader__logo">S</div>
        <div className="loader__bar">
          <div className="loader__fill"></div>
        </div>
        <p className="loader__text">Initializing Portfolio...</p>
      </div>
    </div>
  );
}
