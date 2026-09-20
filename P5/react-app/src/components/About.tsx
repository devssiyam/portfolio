import SectionHeader from './SectionHeader';
import { siteConfig } from '../data/siteConfig';

/**
 * Phase 09 — About redesign ("the profile").
 *
 * Editorial profile, not the standard portrait + bio pattern: his real
 * words set as a statement (left), and a technical index panel (right)
 * covering what he actually works on, his interests, and his current
 * direction — in the numbered-index language the header (Phase 07) and
 * hero (Phase 08) established.
 *
 * Every line below comes from existing source content:
 * - "first-year Computer Science and Engineering student", the two bio
 *   paragraphs, "Hello! I'm Siyam 👋" — his About copy, verbatim.
 * - "HTML, CSS, JavaScript, and React.js" — his own sentence in bio 1.
 * - "Store design & Liquid templating" — service 01 ("Shopify Store
 *   Design… liquid templates") + skills (Shopify, Liquid) + typing
 *   phrases.
 * - "Mobile-first, modern UI" — skills (Responsive Design, UI/UX
 *   Design) + his own principle ("Responsive design is non-negotiable")
 *   + the old "Modern UI" info chip.
 * - "CSE'30 — learning through projects" — the old info chip's
 *   "CSE'30" + bio 1's "continuously improving my development skills
 *   through projects and hands-on practice".
 * - The three principles — his labels and lines, verbatim.
 *
 * Phase 26 (human design audit) — removed:
 * - The second bio paragraph ("great design is more than aesthetics —
 *   it's about solving real problems for real people … precision,
 *   creativity, and passion to every project I take on"). It reads
 *   like generated filler — the generic-cliché sentence set the task
 *   targets — while the first paragraph carries everything factual
 *   (first-year CSE, the real stack, learning through projects).
 *
 * Removed (explicit decisions, recorded in PHASE-09-NOTES.md):
 * - Fake avatar + profile column — no real photo exists in the repo
 *   (same rule as the hero); the "🎓 Frontend Developer" badge content
 *   is already carried by the kicker + statement.
 * - Three info chips — content redistributed, nothing lost:
 *   "Bangladesh" → kicker; "Frontend Developer | CSE'30" → statement
 *   + index row 04; "Shopify Design & Modern UI" → index rows 02/03.
 * - "Download CV" button — dead link (`href="#"`, no file exists), an
 *   AUDIT-flagged open item; a redesign does not carry a dead action.
 *   Re-add when a real CV file exists.
 * - Highlight cards → compact principle rows (same words, less chrome).
 */
export default function About() {
  return (
    <section className="about section" id="about">
      <div className="container">
        <SectionHeader
          tag="Get To Know Me"
          title={<>About <span className="text-accent">Me</span></>}
        />

        <div className="about__grid">
          <div className="about__statement" data-aos="fade-right">
            <p className="about__kicker">
              First-year CSE student
              <span className="about__kicker-sep" aria-hidden="true">
                ·
              </span>
              {siteConfig.location}
            </p>

            <h3 className="about__greeting">
              Hello! I'm <span className="text-accent">Siyam</span> 👋
            </h3>

            <p className="about__bio">
              I'm a first-year Computer Science and Engineering student and Frontend Developer passionate about
              building modern, responsive, and user-friendly web experiences. I work with HTML, CSS, JavaScript, and
              React.js to create clean and interactive web interfaces while continuously improving my development
              skills through projects and hands-on practice.
            </p>

            <a href={siteConfig.whatsappHref} className="about__action">
              Let's Talk
              <span className="about__action-arrow" aria-hidden="true">
                →
              </span>
            </a>
          </div>

          <aside className="about__index" data-aos="fade-left" aria-label="What I work on">
            <p className="about__index-label" aria-hidden="true">
              // what I work on
            </p>

            <ul className="about__index-list">
              <li className="about__index-row">
                <span className="about__index-num" aria-hidden="true">
                  01
                </span>
                <div>
                  <h4>Frontend</h4>
                  <p>HTML · CSS · JavaScript · React.js</p>
                </div>
              </li>
              <li className="about__index-row">
                <span className="about__index-num" aria-hidden="true">
                  02
                </span>
                <div>
                  <h4>Shopify</h4>
                  <p>Store design &amp; Liquid templating</p>
                </div>
              </li>
              <li className="about__index-row">
                <span className="about__index-num" aria-hidden="true">
                  03
                </span>
                <div>
                  <h4>Responsive &amp; UI</h4>
                  <p>Mobile-first, modern UI</p>
                </div>
              </li>
              <li className="about__index-row">
                <span className="about__index-num" aria-hidden="true">
                  04
                </span>
                <div>
                  <h4>Now</h4>
                  <p>CSE'30 — learning through projects</p>
                </div>
              </li>
            </ul>

            <div className="about__principles">
              <div className="about__principle">
                <h4>Goal-Oriented</h4>
                <p>Every line of code serves a purpose</p>
              </div>
              <div className="about__principle">
                <h4>Mobile First</h4>
                <p>Responsive design is non-negotiable</p>
              </div>
              <div className="about__principle">
                <h4>Performance</h4>
                <p>Fast, clean, and optimized always</p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
