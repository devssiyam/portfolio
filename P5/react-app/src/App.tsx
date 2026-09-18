import { useEffect } from 'react';
import Loader from './components/Loader';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import ScrollProgressBar from './components/ScrollProgressBar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Services from './components/Services';
import Stats from './components/Stats';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import { useAosReveal } from './hooks/useAosReveal';
import { useSmoothScroll } from './hooks/useSmoothScroll';

function App() {
  const runAosCheck = useAosReveal();
  useSmoothScroll();

  // Module 19: initial AOS check + console branding, originally run on
  // DOMContentLoaded. React's mount effect is the equivalent point.
  useEffect(() => {
    const id = window.setTimeout(runAosCheck, 100);

    console.log('%c🚀 Portfolio by MD Siyam Uzzaman', 'color:#3B82F6;font-size:14px;font-weight:bold;');
    console.log('%c Frontend Developer & Shopify Designer', 'color:#94A3B8;font-size:11px;');

    return () => window.clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {/* Loader's onComplete preserves the original's direct checkAOS() call
          straight after its own 1800ms timeout (module 1 -> module 7 coupling,
          MIGRATION-PLAN.md §5/§6.3). */}
      <Loader onComplete={runAosCheck} />
      <CustomCursor />
      <ScrollProgressBar />

      <Navbar />

      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Services />
        <Stats />
        <Testimonials />
        <Contact />
      </main>

      <Footer />
      <BackToTop />
    </>
  );
}

export default App;
