import { useEffect, useRef, useState } from 'react';
import { navLinks } from '../data/navLinks';
import { useScrollThreshold } from '../hooks/useScrollThreshold';

/**
 * Phase 07 — Header redesign ("the index").
 *
 * Identity: the wordmark stays the site's actual mark (<SIYAM/> JSX tag +
 * bracket motif) with a blinking block caret that echoes the hero's typing
 * cursor. Navigation reads as an editor's file index — numbered entries
 * (01–06), square corners, solid surfaces. No glass, no blur, no glow, no
 * pills, no oversized CTA: the "Hire Me" action is a quiet boxed link.
 *
 * Behavior carried over from the original (unchanged mechanism):
 * - scrolled state via useScrollThreshold(50)
 * - active section via IntersectionObserver (module 18; the redundant
 *   scroll-position module 5 was dropped in Phase 03, decision on record)
 *
 * New accessibility work (TASK 07 requirements):
 * - Skip link as the first focusable element (target: #main)
 * - aria-current on the active link
 * - Hamburger: dynamic aria-label, aria-expanded, aria-controls
 * - Mobile sheet: focus moves in on open, Tab/Shift+Tab trapped,
 *   Escape closes (document listener, pre-existing), focus returns to the
 *   hamburger on close, body scroll locked (pre-existing), overlay click
 *   closes (pre-existing)
 * - :focus-visible outlines for all header controls
 */
export default function Navbar() {
  const scrolled = useScrollThreshold(50);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeHref, setActiveHref] = useState('#home');

  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);

  // Module 18: active section highlight via IntersectionObserver.
  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>('section[id]');
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHref(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: '-40% 0px -40% 0px', threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // Module 4 behavior: close on Escape (works from anywhere, including
  // the hamburger and the overlay).
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setMenuOpen(false);
    }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, []);

  // Module 4 behavior: lock body scroll while mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  // Phase 07: focus management for the mobile sheet — focus moves to the
  // first entry on open, Tab/Shift+Tab cycle inside the sheet, and focus
  // returns to the hamburger on close (cleanup runs on close).
  useEffect(() => {
    if (!menuOpen) return;
    const menu = menuRef.current;
    const hamburger = hamburgerRef.current;
    if (!menu) return;

    const focusables = () =>
      Array.from(menu.querySelectorAll<HTMLElement>('a[href], button'));

    focusables()[0]?.focus();

    function onKeyDown(e: KeyboardEvent) {
      if (e.key !== 'Tab') return;
      const list = focusables();
      if (!list.length) return;
      const first = list[0];
      const last = list[list.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
    menu.addEventListener('keydown', onKeyDown);

    return () => {
      menu.removeEventListener('keydown', onKeyDown);
      hamburger?.focus();
    };
  }, [menuOpen]);

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <header className={`navbar${scrolled ? ' scrolled' : ''}`} id="navbar">
        <nav className="nav container" aria-label="Main">
          <a href="#home" className="nav__logo" aria-label="Siyam — home">
            <span className="nav__logo-bracket">&lt;</span>SIYAM
            <span className="nav__logo-bracket">/&gt;</span>
            <span className="nav__logo-caret" aria-hidden="true"></span>
          </a>

          <ul className={`nav__menu${menuOpen ? ' open' : ''}`} id="navMenu" ref={menuRef}>
            {navLinks.map((link, i) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`nav__link${activeHref === link.href ? ' active' : ''}`}
                  aria-current={activeHref === link.href ? 'true' : undefined}
                  onClick={() => setMenuOpen(false)}
                >
                  <span className="nav__link-index" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {link.label}
                </a>
              </li>
            ))}
            <li className="nav__menu-cta">
              <a
                href="#contact"
                className="nav__cta-link"
                onClick={() => setMenuOpen(false)}
              >
                Hire Me
                <span className="nav__cta-arrow" aria-hidden="true">
                  →
                </span>
              </a>
            </li>
          </ul>

          <button
            className={`nav__hamburger${menuOpen ? ' open' : ''}`}
            id="hamburger"
            ref={hamburgerRef}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="navMenu"
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </nav>
      </header>

      <div
        className={`mobile-overlay${menuOpen ? ' open' : ''}`}
        id="mobileOverlay"
        aria-hidden="true"
        onClick={() => setMenuOpen(false)}
      ></div>
    </>
  );
}
