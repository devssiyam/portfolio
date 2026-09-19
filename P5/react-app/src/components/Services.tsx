import SectionHeader from './SectionHeader';
import { services } from '../data/services';
import { siteConfig } from '../data/siteConfig';

/**
 * Phase 13 — Services redesign ("the two trades").
 *
 * The 5 repetitive agency-cliché cards ("high-converting", "capture
 * leads", "boost sales", "A/B Testing Ready", 5× "Get Started") are
 * replaced by the two trades the role statement actually names
 * ("Frontend Developer & Shopify Store Designer" — verbatim, Hero H1):
 *
 * - The section subtitle is his own verbatim Hero sentence — the real
 *   "what I do + practical value" ("modern, responsive, visually
 *   attractive websites with clean UI and smooth user experience").
 * - Each trade communicates exactly what the task asks: WHAT (real
 *   scope, source-backed), FOR (honest minimal audience), and the real
 *   TECH (from the About index / skills / project data).
 * - One CTA at the end ("Let's Talk" → real WhatsApp, same pattern as
 *   About) instead of five repeated card links.
 *
 * No invented services: a third trade would have no source backing
 * (the old Landing Page / Responsive / UI Customization cards fold
 * into these two via real project kinds and capabilities — see
 * data/services.ts). Editorial layout (numbered hairline rows, no
 * card grid, no icon tiles, no tilt) — same index language as
 * Skills/About.
 */
export default function Services() {
  return (
    <section className="services section" id="services">
      {/* Phase 26: the ambient radial tint (services__bg) is gone —
          unnecessary glow. */}
      <div className="container">
        <SectionHeader
          tag="What I Offer"
          title={<>My <span className="text-accent">Services</span></>}
          subtitle="I create modern, responsive, and visually attractive websites with clean UI and smooth user experience."
        />

        <div className="services__trades">
          {services.map((service, i) => (
            <article
              className="services__trade"
              key={service.number}
              data-aos="fade-up"
              data-aos-delay={i * 100}
            >
              <span className="services__trade-num">{service.number}</span>
              <h3 className="services__trade-title">{service.title}</h3>

              <div className="services__trade-row">
                <span className="services__trade-label">What</span>
                <p className="services__trade-text">{service.what}</p>
              </div>
              <div className="services__trade-row">
                <span className="services__trade-label">For</span>
                <p className="services__trade-text">{service.audience}</p>
              </div>

              <div className="services__trade-tech">
                {service.tech.map((tech) => (
                  <span className="services__tech-token" key={tech}>
                    {tech}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>

        <div className="services__cta" data-aos="fade-up" data-aos-delay="200">
          <span className="services__cta-kicker">// have a project in mind?</span>
          <a href={siteConfig.whatsappHref} className="services__cta-link">
            Let's Talk
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
