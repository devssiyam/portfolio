import SectionHeader from './SectionHeader';
import { projects } from '../data/projects';
import { GitHubIcon } from './icons';
import type { Project } from '../types/content';

/**
 * Phase 11 — Projects redesign ("the work index").
 *
 * The old 6 identical cards — each with a dead "#" Live Demo button and a
 * GitHub button pointing at the SAME unrelated repo (AUDIT risk #8) — are
 * replaced by a verification-first index where the actual content
 * determines the hierarchy:
 *
 * - The ONE project with a verified public source (the portfolio itself —
 *   github.com/devssiyam/portfolio, confirmed via the GitHub API) is
 *   featured as a case with its real link.
 * - The other five are numbered index rows carrying exactly what actually
 *   exists: name, context (category), what it is (verbatim description),
 *   stack (tags), and the real per-project schematic wireframe as a glyph
 *   marker (no screenshots exist in the source — none are faked).
 * - A factual footnote states what is not public. No invented
 *   results/metrics; no links without verified targets.
 *
 * Phase 12 — case study: the ONLY project with enough real, verifiable
 * information gets a case file (see data/projects.ts for the per-line
 * sources): Context, Role, and Technical decisions — every other
 * dimension (problem, approach, challenges, solution, results) has no
 * source content and is simply absent, never padded. No other project
 * gets a case file: without a verified artifact there is nothing real to
 * case-study, and one made from names and tags would be filler.
 *
 * Interactions are context-appropriate for an index (row hover emphasis,
 * scroll reveal) — the 3D card tilt is gone with the cards (the
 * `useCardTilt` hook was removed in Phase 15 when its last consumer —
 * the TestimonialCard — was deleted).
 */

function Glyph({ project }: { project: Project }) {
  return (
    <div
      className="projects__tile"
      style={{ '--proj-color': project.colorVar } as React.CSSProperties}
      aria-hidden="true"
    >
      {/* Phase 28 (security): schematic shapes are React elements from
          data/projects.tsx — rendered as elements, never parsed from a
          string (the dangerouslySetInnerHTML sink is gone). */}
      <svg
        viewBox="0 0 80 60"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        aria-hidden="true"
        focusable="false"
      >
        {project.placeholderSvg}
      </svg>
    </div>
  );
}

function Stack({ project }: { project: Project }) {
  return (
    <div className="projects__stack">
      {project.tags.map((tag) => (
        <span className="projects__tag" key={tag}>
          {tag}
        </span>
      ))}
    </div>
  );
}

export default function Projects() {
  // The presentation is determined by the data: the only project with a
  // verified public source is featured (always slot 01); the rest form the
  // numbered index (02–06, source order preserved).
  const featured = projects.find((p) => p.repoUrl) ?? null;
  const indexed = projects.filter((p) => p !== featured);

  return (
    <section className="projects section" id="projects">
      <div className="container">
        <SectionHeader
          tag="My Work"
          title={<>Featured <span className="text-accent">Projects</span></>}
          subtitle="A selection of real-world projects I've built and designed"
        />

        {featured && (
          <article className="projects__case" data-aos="fade-up">
            <Glyph project={featured} />
            <div className="projects__case-body">
              <p className="projects__meta">
                <span className="projects__num">01</span> · {featured.category}
              </p>
              <h3 className="projects__title">{featured.title}</h3>
              <p className="projects__desc">{featured.description}</p>
              <Stack project={featured} />
            </div>
            <a
              href={featured.repoUrl}
              className="btn btn--ghost btn--sm"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Portfolio source on GitHub"
            >
              <GitHubIcon size={14} />
              GitHub
            </a>

            {featured.caseStudy && (
              <div className="projects__casestudy">
                <span className="projects__cs-kicker">// case file</span>
                <span className="projects__cs-label">Context</span>
                <p className="projects__cs-body">{featured.caseStudy.context}</p>
                <span className="projects__cs-label">Role</span>
                <p className="projects__cs-body">{featured.caseStudy.role}</p>
                <span className="projects__cs-label">Technical decisions</span>
                <ul className="projects__cs-list">
                  {featured.caseStudy.technicalDecisions.map((decision) => (
                    <li key={decision}>{decision}</li>
                  ))}
                </ul>
              </div>
            )}
          </article>
        )}

        <div className="projects__index" data-aos="fade-up" data-aos-delay="100">
          {indexed.map((project, i) => (
            <article className="projects__row" key={project.title}>
              <Glyph project={project} />
              <div className="projects__row-body">
                <p className="projects__meta">
                  <span className="projects__num">
                    {String(i + 2).padStart(2, '0')}
                  </span>{' '}
                  · {project.category}
                </p>
                <h3 className="projects__title">{project.title}</h3>
                <p className="projects__desc">{project.description}</p>
                <Stack project={project} />
              </div>
            </article>
          ))}
        </div>

        <p className="projects__note">
          The source for the other projects is not hosted as public
          repositories.
        </p>
      </div>
    </section>
  );
}
