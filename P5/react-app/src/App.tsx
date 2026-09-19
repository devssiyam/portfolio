import { useEffect } from 'react';
import Navbar from './components/Navbar';
import ScrollProgressBar from './components/ScrollProgressBar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import { useAosReveal } from './hooks/useAosReveal';
import { useSmoothScroll } from './hooks/useSmoothScroll';

/**
 * Phase 26 (human design audit) — removed:
 * - Loader: a 1.8 s blocking "Initializing Portfolio..." screen with a fake
 *   progress fill. The page is one local bundle — there is nothing to
 *   initialize; the delay was pure theater (AUDIT open item).
 * - CustomCursor: a decorative dot + trailing ring that hid the native
 *   cursor (body { cursor: none }) and ran a permanent rAF loop — an
 *   artificial "premium" effect with no information in it (AUDIT open
 *   item territory: unnecessary animation + unnecessary listener).
 * - Stats: the animated counter band (20+ Projects / 15+ Happy Clients /
 *   2+ Years / 8+ Technologies). Generic count-up pattern, and the
 *   numbers are unsupported — "15 Happy Clients" was already an
 *   AUDIT-flagged item. Subtraction, not invention: nothing real is
 *   lost.
 * - Console branding (two styled console.log lines — production noise).
 *
 * AOS first pass: the original ran checkAOS() on DOMContentLoaded and
 * again after the loader finished. The loader is gone; the equivalent
 * is the mount check (below) plus a re-check on window 'load'.
 */
function App() {
  const runAosCheck = useAosReveal();
  useSmoothScroll();

  useEffect(() => {
    const id = window.setTimeout(runAosCheck, 100);
    const onLoad = () => runAosCheck();
    window.addEventListener('load', onLoad);

    return () => {
      window.clearTimeout(id);
      window.removeEventListener('load', onLoad);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <ScrollProgressBar />

      <Navbar />

      {/* id="main" + tabIndex added in Phase 07 — the skip link's target
          (tabIndex=-1 lets it receive focus on skip-link activation) */}
      <main id="main" tabIndex={-1}>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Services />
        <Contact />
      </main>

      <Footer />
      <BackToTop />
    </>
  );
}

export default App;
