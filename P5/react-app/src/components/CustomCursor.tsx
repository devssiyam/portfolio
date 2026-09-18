import { useEffect, useRef } from 'react';

/**
 * Recreates initCursor() (module 2) exactly: same follower easing (0.12),
 * same hover-target selector, same window-leave/enter opacity toggle.
 * Unlike the original (which ran once for the page's lifetime), this uses
 * an explicit useEffect cleanup to cancel the rAF loop and remove listeners
 * on unmount — the single highest migration risk flagged in
 * MIGRATION-PLAN.md §6.1.
 */
export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    let mouseX = 0;
    let mouseY = 0;
    let followerX = 0;
    let followerY = 0;
    let animFrame: number;

    function onMouseMove(e: MouseEvent) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor!.style.left = mouseX + 'px';
      cursor!.style.top = mouseY + 'px';
    }

    function animateFollower() {
      followerX += (mouseX - followerX) * 0.12;
      followerY += (mouseY - followerY) * 0.12;
      follower!.style.left = followerX + 'px';
      follower!.style.top = followerY + 'px';
      animFrame = requestAnimationFrame(animateFollower);
    }
    animFrame = requestAnimationFrame(animateFollower);

    document.addEventListener('mousemove', onMouseMove);

    const hoverTargets = document.querySelectorAll(
      'a, button, .skill-card, .project-card, .service-card, .social-btn, input, textarea',
    );

    function onEnter() {
      cursor!.classList.add('cursor--active');
      follower!.classList.add('cursor-follower--active');
    }
    function onLeave() {
      cursor!.classList.remove('cursor--active');
      follower!.classList.remove('cursor-follower--active');
    }
    hoverTargets.forEach((el) => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    function onDocLeave() {
      cursor!.style.opacity = '0';
      follower!.style.opacity = '0';
    }
    function onDocEnter() {
      cursor!.style.opacity = '1';
      follower!.style.opacity = '1';
    }
    document.addEventListener('mouseleave', onDocLeave);
    document.addEventListener('mouseenter', onDocEnter);

    return () => {
      cancelAnimationFrame(animFrame);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onDocLeave);
      document.removeEventListener('mouseenter', onDocEnter);
      hoverTargets.forEach((el) => {
        el.removeEventListener('mouseenter', onEnter);
        el.removeEventListener('mouseleave', onLeave);
      });
    };
  }, []);

  return (
    <>
      <div className="cursor" id="cursor" ref={cursorRef}></div>
      <div className="cursor-follower" id="cursorFollower" ref={followerRef}></div>
    </>
  );
}
