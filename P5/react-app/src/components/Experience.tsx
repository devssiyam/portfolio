import SectionHeader from './SectionHeader';
import { experience, experiencePeriod } from '../data/experience';

/**
 * Phase 14 — Experience ("the current position").
 *
 * No Experience section existed anywhere (not in the vanilla
 * baseline, the app, or the nav) — this is a conditional
 * creation: the source supports exactly ONE period (the present),
 * with two real positions in it. Because there is one period, the
 * presentation is NOT a timeline — a multi-node timeline would be
 * invented structure (the task says so explicitly).
 *
 * What is real (see data/experience.ts for per-line evidence):
 * - 01 CSE Student — 1st year · CSE'30 (verbatim source wording;
 *   no organization line because no university name exists in the
 *   source; no dates because the source gives none).
 * - 02 Frontend Developer — self-described role (bio + H1), with
 *   the verbatim freelance-availability line and a factual pointer
 *   to the real work (projects section; public portfolio source).
 *
 * Not in the nav on purpose (the Stats band sets that precedent) —
 * Phase 07's 6-item index is untouched. The pulsing "current" dot
 * reuses the Hero kicker's language (same dot, same dotPulse
 * keyframes) — it signals the same thing: this is happening now.
 */
export default function Experience() {
  return (
    <section className="experience section" id="experience">
      <div className="container">
        <SectionHeader
          tag="Experience"
          title={<>Where I <span className="text-accent">Am</span></>}
        />

        <div className="experience__panel" data-aos="fade-up">
          <p className="experience__period">
            <span className="experience__period-dot" aria-hidden="true"></span>
            {experiencePeriod}
          </p>

          {experience.map((entry) => (
            <article className="experience__entry" key={entry.number}>
              <div className="experience__entry-head">
                <span className="experience__entry-num">{entry.number}</span>
                <h3 className="experience__entry-role">{entry.role}</h3>
              </div>
              <div className="experience__entry-row">
                <span className="experience__entry-label">Period</span>
                <p className="experience__entry-text">{entry.period}</p>
              </div>
              <div className="experience__entry-row">
                <span className="experience__entry-label">Work</span>
                <p className="experience__entry-text">{entry.work}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
