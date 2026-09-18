import { useEffect, useRef } from 'react';
import { typingPhrases } from '../data/typingPhrases';
import { useTypingEffect } from '../hooks/useTypingEffect';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { siteConfig } from '../data/siteConfig';
import { mediaQuery } from '../styles/tokens';

/**
 * Migrates the hero section plus module 17 (orb parallax, desktop only,
 * same matchMedia(max-width:768px) guard now backed by useMediaQuery so the
 * literal 768 has one source of truth, per MIGRATION-PLAN.md §5). The
 * literal itself now comes from the shared breakpoint token
 * (styles/tokens.ts, Phase 05).
 */
export default function Hero() {
  const typingText = useTypingEffect(typingPhrases);
  const isMobile = useMediaQuery(mediaQuery.mobile);
  const orbRefs = [useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null)];

  useEffect(() => {
    if (isMobile) return;

    function onMouseMove(e: MouseEvent) {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;

      orbRefs.forEach((ref, i) => {
        const factor = (i + 1) * 12;
        if (ref.current) {
          ref.current.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
        }
      });
    }

    document.addEventListener('mousemove', onMouseMove);
    return () => document.removeEventListener('mousemove', onMouseMove);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile]);

  return (
    <section className="hero" id="home">
      <div className="hero__grid"></div>
      <div className="hero__orb hero__orb--1" ref={orbRefs[0]}></div>
      <div className="hero__orb hero__orb--2" ref={orbRefs[1]}></div>
      <div className="hero__orb hero__orb--3" ref={orbRefs[2]}></div>

      <div className="container hero__container">
        <div className="hero__content" data-aos="fade-right">
          <div className="hero__badge">
            <span className="hero__badge-dot"></span>
            Available for Freelance Work
          </div>
          <h1 className="hero__title">
            Frontend Developer
            <br />
            <span className="hero__title-accent">&amp; Shopify Store</span>
            <br />
            Designer
          </h1>
          <p className="hero__subtitle">
            I create modern, responsive, and visually attractive websites with clean UI and smooth user experience.
          </p>

          <div className="hero__typing">
            <span className="hero__typing-prefix">I specialize in </span>
            <span className="hero__typing-text" id="typingText">
              {typingText}
            </span>
            <span className="hero__typing-cursor">|</span>
          </div>

          <div className="hero__actions">
            <a href={siteConfig.social.github} className="btn btn--primary btn--lg">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0l-7 7m7-7l-7-7" />
              </svg>
              View Projects
            </a>
            <a href={`mailto:${siteConfig.heroEmail}`} className="btn btn--outline btn--lg">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              Contact Me
            </a>
          </div>

          <div className="hero__stats">
            <div className="hero__stat">
              <span className="hero__stat-number">20+</span>
              <span className="hero__stat-label">Projects</span>
            </div>
            <div className="hero__stat-divider"></div>
            <div className="hero__stat">
              <span className="hero__stat-number">15+</span>
              <span className="hero__stat-label">Clients</span>
            </div>
            <div className="hero__stat-divider"></div>
            <div className="hero__stat">
              <span className="hero__stat-number">2+</span>
              <span className="hero__stat-label">Yrs Exp.</span>
            </div>
          </div>
        </div>

        <div className="hero__visual" data-aos="fade-left">
          <div className="hero__avatar-wrap">
            <div className="hero__ring hero__ring--outer"></div>
            <div className="hero__ring hero__ring--inner"></div>
            <div className="hero__avatar">
              <svg viewBox="0 0 260 260" xmlns="http://www.w3.org/2000/svg" className="hero__avatar-svg">
                <defs>
                  <linearGradient id="avatarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#3B82F6', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: '#8B5CF6', stopOpacity: 1 }} />
                  </linearGradient>
                </defs>
                <circle cx="130" cy="130" r="130" fill="url(#avatarGrad)" opacity="0.15" />
                <circle cx="130" cy="88" r="36" fill="#3B82F6" opacity="0.9" />
                <ellipse cx="130" cy="185" rx="55" ry="45" fill="#3B82F6" opacity="0.7" />
                <text x="34" y="145" fontFamily="monospace" fontSize="42" fill="#3B82F6" opacity="0.5" fontWeight="700">
                  {'{'}
                </text>
                <text x="205" y="145" fontFamily="monospace" fontSize="42" fill="#8B5CF6" opacity="0.5" fontWeight="700">
                  {'}'}
                </text>
                <circle cx="52" cy="60" r="3" fill="#F8FAFC" opacity="0.6" />
                <circle cx="210" cy="80" r="2" fill="#F8FAFC" opacity="0.4" />
                <circle cx="220" cy="195" r="3" fill="#3B82F6" opacity="0.7" />
                <circle cx="40" cy="200" r="2" fill="#8B5CF6" opacity="0.5" />
              </svg>
            </div>

            <div className="hero__badge-float hero__badge-float--1">HTML5</div>
            <div className="hero__badge-float hero__badge-float--2">Shopify</div>
            <div className="hero__badge-float hero__badge-float--3">CSS3</div>
            <div className="hero__badge-float hero__badge-float--4">JS</div>
          </div>

          <div className="hero__code-card">
            <div className="hero__code-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <pre className="hero__code-snippet">
              <span className="code-keyword">const</span> <span className="code-var">developer</span>{' '}
              <span className="code-op">=</span> {'{'}
              {'\n'}  <span className="code-key">name</span>: <span className="code-str">"Siyam Uzzaman"</span>,
              {'\n'}  <span className="code-key">role</span>: <span className="code-str">"Frontend Dev"</span>,
              {'\n'}  <span className="code-key">passion</span>: <span className="code-str">"Clean UI"</span>{' '}
              <span className="code-comment">✨</span>
              {'\n'}
              {'}'};
            </pre>
          </div>
        </div>
      </div>

      <div className="hero__scroll">
        <div className="hero__scroll-line"></div>
        <span>Scroll</span>
      </div>
    </section>
  );
}
