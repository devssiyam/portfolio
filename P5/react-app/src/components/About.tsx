import SectionHeader from './SectionHeader';
import { siteConfig } from '../data/siteConfig';

export default function About() {
  return (
    <section className="about section" id="about">
      <div className="container">
        <SectionHeader tag="Get To Know Me" title={<>About <span className="text-accent">Me</span></>} />

        <div className="about__grid">
          <div className="about__profile" data-aos="fade-right">
            <div className="about__profile-img">
              <div className="about__profile-placeholder">
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="profileGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{ stopColor: '#3B82F6' }} />
                      <stop offset="100%" style={{ stopColor: '#8B5CF6' }} />
                    </linearGradient>
                  </defs>
                  <circle cx="100" cy="100" r="100" fill="url(#profileGrad)" opacity="0.15" />
                  <circle cx="100" cy="80" r="32" fill="#3B82F6" opacity="0.85" />
                  <ellipse cx="100" cy="155" rx="48" ry="38" fill="#3B82F6" opacity="0.65" />
                </svg>
              </div>
              <div className="about__profile-badge">
                <span>🎓</span> Frontend Developer
              </div>
            </div>

            <div className="about__info-cards">
              <div className="about__info-card">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Bangladesh</span>
              </div>
              <div className="about__info-card">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span>Frontend Developer | CSE'30</span>
              </div>
              <div className="about__info-card">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
                <span>Shopify Design &amp; Modern UI</span>
              </div>
            </div>
          </div>

          <div className="about__content" data-aos="fade-left">
            <h3 className="about__greeting">
              Hello! I'm <span className="text-accent">Siyam</span> 👋
            </h3>
            <p className="about__bio">
              I'm a first-year Computer Science and Engineering student and Frontend Developer passionate about
              building modern, responsive, and user-friendly web experiences. I work with HTML, CSS, JavaScript, and
              React.js to create clean and interactive web interfaces while continuously improving my development
              skills through projects and hands-on practice.
            </p>
            <p className="about__bio">
              I believe great design is more than aesthetics — it's about solving real problems for real people.
              Whether it's crafting a pixel-perfect Shopify store or building a blazing-fast landing page, I bring
              precision, creativity, and passion to every project I take on.
            </p>

            <div className="about__highlights">
              <div className="about__highlight">
                <div className="about__highlight-icon">🎯</div>
                <div>
                  <h4>Goal-Oriented</h4>
                  <p>Every line of code serves a purpose</p>
                </div>
              </div>
              <div className="about__highlight">
                <div className="about__highlight-icon">📱</div>
                <div>
                  <h4>Mobile First</h4>
                  <p>Responsive design is non-negotiable</p>
                </div>
              </div>
              <div className="about__highlight">
                <div className="about__highlight-icon">⚡</div>
                <div>
                  <h4>Performance</h4>
                  <p>Fast, clean, and optimized always</p>
                </div>
              </div>
            </div>

            <div className="about__actions">
              <a href={siteConfig.whatsappHref} className="btn btn--primary">
                Let's Talk
              </a>
              <a href={siteConfig.cvHref} className="btn btn--ghost" download>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
                Download CV
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
