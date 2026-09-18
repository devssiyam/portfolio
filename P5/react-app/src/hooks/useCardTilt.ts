import { useEffect, type RefObject } from 'react';
import { useMediaQuery } from './useMediaQuery';
import { mediaQuery } from '../styles/tokens';

/**
 * Exact extraction of initCardTilt() (module 14): same rotateX/rotateY math,
 * same desktop-only matchMedia(max-width:768px) guard (now via
 * useMediaQuery, one source of truth per MIGRATION-PLAN.md §5), with
 * explicit listener cleanup on unmount (same leak class as cursor/typing,
 * §6.1). The 768px literal itself now comes from the shared breakpoint
 * token (styles/tokens.ts, Phase 05) instead of being repeated here.
 */
export function useCardTilt(ref: RefObject<HTMLElement | null>) {
  const isMobile = useMediaQuery(mediaQuery.mobile);

  useEffect(() => {
    const card = ref.current;
    if (!card || isMobile) return;

    function onMouseMove(e: MouseEvent) {
      const rect = card!.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -4;
      const rotateY = ((x - centerX) / centerX) * 4;

      card!.style.transform = `translateY(-6px) perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }

    function onMouseLeave() {
      card!.style.transform = '';
    }

    card.addEventListener('mousemove', onMouseMove);
    card.addEventListener('mouseleave', onMouseLeave);

    return () => {
      card.removeEventListener('mousemove', onMouseMove);
      card.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [ref, isMobile]);
}
