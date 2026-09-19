/**
 * Phase 17 — Footer redesign ("the last line").
 *
 * The footer is a natural closing point, not a second homepage:
 * - IDENTITY — the <SIYAM/> mark (same as the navbar) + the one-line
 *   role from the source ("Frontend Developer & Shopify Store
 *   Designer") and location. No invented bio, no repeated CTA — the
 *   Contact section directly above IS the call to action.
 * - // JUMP — the six in-page sections, reused from navLinks.ts (the
 *   same single source of truth as the header — no duplicated list).
 *   In-page anchors smooth-scroll via the global useSmoothScroll hook.
 * - // REACH — the four DIRECT channels as plain text links (no icon
 *   grid): Email (real, git-verified address), WhatsApp (real deep
 *   link, number shown from the href — same pattern as Contact),
 *   GitHub + LinkedIn (verified/supplied, _blank + noopener).
 *   Facebook/Instagram stay in the Contact section, which carries
 *   the full set — the footer keeps the direct channels (decision
 *   documented in PHASE-17-NOTES.md).
 * - NO CV link (no real file exists — same rule as Phase 16).
 * - COPYRIGHT — the source's own wording, kept verbatim, plus the
 *   source's "Built with ❤️ by Siyam Uzzaman" line.
 */
import { navLinks } from '../data/navLinks';
import { siteConfig } from '../data/siteConfig';

export default function Footer() {
  const whatsappNumber = siteConfig.whatsappDisplay;

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__main">
          <div className="footer__id">
            <span className="footer__logo">
              <span className="nav__logo-bracket">&lt;</span>SIYAM
              <span className="nav__logo-bracket">/&gt;</span>
            </span>
            <p className="footer__tag">
              Frontend Developer &amp; Shopify Store Designer · {siteConfig.location}
            </p>
          </div>

          <nav className="footer__nav" aria-label="Footer">
            <span className="footer__kicker">// jump</span>
            <ul className="footer__nav-list">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="footer__reach">
            <span className="footer__kicker">// reach</span>
            <ul className="footer__reach-list">
              <li>
                <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>
              </li>
              <li>
                <a href={siteConfig.whatsappHref}>{whatsappNumber}</a>
              </li>
              <li>
                <a
                  href={siteConfig.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copy">© 2026 MD SIYAM UZZAMAN. All Rights Reserved.</p>
          <p className="footer__built">Built with ❤️ by Siyam Uzzaman</p>
        </div>
      </div>
    </footer>
  );
}
