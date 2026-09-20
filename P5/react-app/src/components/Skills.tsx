import SectionHeader from './SectionHeader';
import { skills } from '../data/skills';
import type { SkillGroup } from '../types/content';

/**
 * Phase 10 — Skills redesign ("the stack manifest").
 *
 * The old 8-card grid with animated progress bars and fake percentages
 * (which never even matched the displayed numbers — an AUDIT-flagged
 * issue) is replaced by a single bordered manifest: the genuinely
 * supported skills, grouped by the areas they actually cover, numbered
 * in the site's index language (Phase 07 header, Phase 09 About).
 *
 * Explicit decisions (recorded in PHASE-10-NOTES.md):
 * - No percentages, progress bars, or any proficiency signaling —
 *   removed from the presentation AND from the data model.
 * - Four real groups: Frontend / UI & Responsive / Shopify / Tools.
 *   No "Currently Learning" group — no learning list exists in the
 *   source, and none is invented.
 * - React.js included (genuinely supported: his own bio sentence and
 *   the Phase 09 About index). It has no icon asset in the source, so
 *   it renders icon-less like every other token.
 * - Skill icons (real assets) stay in the data but are not rendered —
 *   the manifest is a code-style list; brand icons belonged to the
 *   card grid that is gone.
 */
const GROUPS: SkillGroup[] = ['Frontend', 'UI & Responsive', 'Shopify', 'Tools'];

export default function Skills() {
  return (
    <section className="skills section" id="skills">
      {/* Phase 26: the ambient radial tint (skills__bg) is gone —
          unnecessary glow. */}
      <div className="container">
        {/* Phase 26: the subtitle ("…to bring ideas to life" — generated
            filler) is gone; the manifest speaks for itself. */}
        <SectionHeader
          tag="What I Know"
          title={<>My <span className="text-accent">Skills</span></>}
        />

        <div className="skills__manifest" data-aos="fade-up">
          {GROUPS.map((group, gi) => (
            <div className="skills__group" key={group}>
              <div className="skills__group-head">
                <span className="skills__group-num" aria-hidden="true">
                  {String(gi + 1).padStart(2, '0')}
                </span>
                <h3 className="skills__group-label">{group}</h3>
              </div>
              <ul className="skills__tokens">
                {skills
                  .filter((skill) => skill.group === group)
                  .map((skill) => (
                    <li className="skills__token" key={skill.name}>
                      {skill.name}
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
