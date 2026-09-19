import { siteConfig } from '../data/siteConfig';

/**
 * Phase 08 — Hero redesign ("the masthead").
 *
 * Editorial masthead composition instead of the standard split hero:
 * the real content — status + location, the exact role, his own
 * one-liner, and two real actions, plus his name/program byline — set
 * left in a 7/5 spread beside the one real visual asset that carries
 * the identity: the code card, now a captioned figure.
 *
 * Removed (explicit decisions, recorded in PHASE-08-NOTES.md):
 * - Fake avatar portrait + rotating rings — no real photo exists in
 *   the repo; the generic illustrated person was not a real asset.
 * - Orb parallax — pure decoration; the effect drops with the orbs.
 * - Floating tech badges — preserved as the figure's mono caption
 *   (the real skill names from data/skills.ts), not deleted.
 * - Hero stat trio (20+/15+/2+) — dropped from the hero for
 *   concision; nothing lost, nothing invented.
 *
 * Phase 26 (human design audit) — removed:
 * - The typewriter line ("I specialize in [cycling phrases]"): the
 *   most generic portfolio motion there is. The stack it cycled is
 *   already stated by the figure caption and the Skills section.
 * - The background grid div — decorative texture, no information.
 * - The fake editor's traffic-light dots — decoration faking an app
 *   window; the card is a code block, and that reads as itself.
 * - The "✨" in the snippet's comment — the tell of a generated
 *   one-liner; the values in the card are the real ones.
 *
 * Actions (both real, both available):
 * - "View Projects" → #projects — the in-page section. (The original
 *   pointed at the shared placeholder repo URL, an AUDIT.md flagged
 *   item that is not a real per-project destination.)
 * - "Email Me" → mailto:siteConfig.contactEmail — the real channel
 *   (the single canonical email key — the redundant heroEmail was
 *   removed in Phase 31).
 * - WhatsApp deliberately stays where it already lives (About's
 *   "Let's Talk") — not tripled here.
 */
export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="container hero__container">
        <div className="hero__content" data-aos="fade-right">
          <p className="hero__kicker">
            <span className="hero__kicker-dot" aria-hidden="true"></span>
            Available for freelance work
            <span className="hero__kicker-sep" aria-hidden="true">—</span>
            {siteConfig.location}
          </p>

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

          <div className="hero__actions">
            <a href="#projects" className="hero__action hero__action--primary">
              View Projects
              <span className="hero__action-arrow" aria-hidden="true">
                →
              </span>
            </a>
            <a href={`mailto:${siteConfig.contactEmail}`} className="hero__action">
              Email Me
              <span className="hero__action-arrow" aria-hidden="true">
                →
              </span>
            </a>
          </div>

          <p className="hero__byline">Siyam Uzzaman — first-year CSE student, CSE'30</p>
        </div>

        <figure className="hero__figure" data-aos="fade-left">
          <div className="hero__code-card">
            <pre className="hero__code-snippet">
              <span className="code-keyword">const</span> <span className="code-var">developer</span>{' '}
              <span className="code-op">=</span> {'{'}
              {'\n'}  <span className="code-key">name</span>: <span className="code-str">"Siyam Uzzaman"</span>,
              {'\n'}  <span className="code-key">role</span>: <span className="code-str">"Frontend Dev"</span>,
              {'\n'}  <span className="code-key">passion</span>: <span className="code-str">"Clean UI"</span>
              {'\n'}
              {'}'};
            </pre>
          </div>
          <figcaption className="hero__code-caption">
            stack — HTML5 · CSS3 · JavaScript · Shopify
          </figcaption>
        </figure>
      </div>

      <div className="hero__scroll">
        <div className="hero__scroll-line"></div>
        <span>Scroll</span>
      </div>
    </section>
  );
}
