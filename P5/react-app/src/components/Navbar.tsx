import { useEffect, useState } from 'react';
import { navLinks } from '../data/navLinks';
import { useScrollThreshold } from '../hooks/useScrollThreshold';

/**
 * Migrates modules 3, 4, 5, and 18 together (they all live on the navbar/menu):
 * - #3 sticky navbar scroll state -> useScrollThreshold(50)
 * - #4 mobile hamburger menu -> local useState, replacing class toggles
 * - #5 vs #18 active-nav-link duplication -> EXPLICIT DECISION (per
 *   MIGRATION-PLAN.md §6.2, made here rather than silently): only #18's
 *   IntersectionObserver-based section highlight is kept. #5's
 *   scroll-position version is dropped as redundant (AUDIT.md risk #7).
 */
export default function Navbar() {
  const scrolled = useScrollThreshold(50);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeHref, setActiveHref] = useState('#home');

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

  // Module 4 behavior: close on Escape.
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

  return (
    <>
      <header className={`navbar${scrolled ? ' scrolled' : ''}`} id="navbar">
        <nav className="nav container">
          <a href="#home" className="nav__logo">
            <span className="nav__logo-bracket">&lt;</span>SIYAM
            <span className="nav__logo-bracket">/&gt;</span>
          </a>

          <ul className={`nav__menu${menuOpen ? ' open' : ''}`} id="navMenu">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`nav__link${activeHref === link.href ? ' active' : ''}`}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <a href="#contact" className="btn btn--sm btn--primary nav__cta">
            Hire Me
          </a>

          <button
            className={`nav__hamburger${menuOpen ? ' open' : ''}`}
            id="hamburger"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
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
        onClick={() => setMenuOpen(false)}
      ></div>
    </>
  );
}
