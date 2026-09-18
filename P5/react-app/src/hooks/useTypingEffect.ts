import { useEffect, useState } from 'react';

/**
 * Exact extraction of initTyping() (module 6): same 80ms type speed, 40ms
 * delete speed, 1800ms pause at end of phrase, 400ms pause between phrases,
 * and the same 2000ms initial start delay. Cleaned up on unmount (this is
 * the same leak class as the cursor's rAF loop, per MIGRATION-PLAN.md §6.1).
 */
export function useTypingEffect(phrases: string[], startDelay = 2000): string {
  const [text, setText] = useState('');

  useEffect(() => {
    if (!phrases.length) return;

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 80;
    let timeoutId: number;

    function type() {
      const currentPhrase = phrases[phraseIndex];
      const displayed = isDeleting
        ? currentPhrase.substring(0, charIndex - 1)
        : currentPhrase.substring(0, charIndex + 1);

      setText(displayed);

      if (!isDeleting) {
        charIndex++;
        typeSpeed = 80;
        if (charIndex === currentPhrase.length) {
          typeSpeed = 1800;
          isDeleting = true;
        }
      } else {
        charIndex--;
        typeSpeed = 40;
        if (charIndex === 0) {
          isDeleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
          typeSpeed = 400;
        }
      }

      timeoutId = window.setTimeout(type, typeSpeed);
    }

    const startId = window.setTimeout(type, startDelay);

    return () => {
      window.clearTimeout(startId);
      window.clearTimeout(timeoutId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return text;
}
