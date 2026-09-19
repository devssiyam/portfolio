import type { Project } from '../types/content';

// Phase 11 — verified-link pass (verified against the GitHub API, 2026-09-18):
// - REMOVED: every `demoUrl: '#'` — no live deployment exists anywhere
//   (no GitHub Pages on either repo, no other published URL).
// - REMOVED: the shared `repoUrl` that pointed all 6 projects at
//   github.com/devssiyam/devs.siyam — that repo is real but contains only a
//   profile README (verified via the repo tree); it contains none of these
//   projects. devssiyam's only other public repo is `portfolio` itself.
// - The ONLY verified public project artifact is the portfolio project's
//   current source (github.com/devssiyam/portfolio — this site's real
//   repo), so only that entry carries a `repoUrl`. Every other entry
//   carries no link; nothing renders without a verified target.
// - No screenshots exist anywhere in the source. The per-project schematic
//   wireframes (real baseline assets) are kept and rendered as glyph
//   markers — not presented as screenshots.
// - Titles, categories, and tags are verbatim from the source baseline.
//   Descriptions: Phase 26 (human design audit) trimmed the generic
//   adjectives ("sleek", "high-converting", "premium", "blazing",
//   "smooth animations/transitions") and one inaccuracy — "typed.js"
//   (the baseline's typing effect is hand-rolled initTyping(), not the
//   library). The factual content of each line is unchanged.
// Phase 28 (security): placeholderSvg values are React element trees
// (this file is .tsx for that reason), not raw-SVG strings — the
// dangerouslySetInnerHTML sink in Projects.tsx is gone.
export const projects: Project[] = [
  {
    title: 'Modern Tech Store UI',
    description:
      'E-commerce interface for a tech product store — product listings, cart, checkout flow.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    category: 'E-Commerce UI',
    colorVar: '#3B82F6',
    placeholderSvg: (
          <>
                      <rect x="5" y="5" width="70" height="50" rx="4" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.4"/>
            <rect x="10" y="12" width="25" height="3" rx="1" opacity="0.6"/>
            <rect x="10" y="18" width="18" height="3" rx="1" opacity="0.4"/>
            <rect x="10" y="28" width="28" height="16" rx="2" opacity="0.3"/>
            <rect x="42" y="28" width="28" height="16" rx="2" opacity="0.3"/>
            <circle cx="65" cy="15" r="8" opacity="0.2"/>
          </>
        ),
  },
  {
    title: 'Shopify Product Page',
    description:
      'Custom Shopify product page with Liquid templates and dynamic sections.',
    tags: ['Shopify', 'Liquid', 'CSS'],
    category: 'Shopify',
    colorVar: '#96BF48',
    placeholderSvg: (
          <>
                      <rect x="5" y="5" width="70" height="50" rx="4" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.4"/>
            <circle cx="30" cy="28" r="14" opacity="0.3"/>
            <rect x="48" y="14" width="22" height="3" rx="1" opacity="0.6"/>
            <rect x="48" y="20" width="16" height="3" rx="1" opacity="0.4"/>
            <rect x="48" y="30" width="12" height="5" rx="2" opacity="0.5"/>
            <rect x="48" y="39" width="18" height="3" rx="1" opacity="0.3"/>
          </>
        ),
  },
  {
    title: 'Responsive Landing Page',
    description:
      'Landing page with hero, features, testimonials, and CTA sections — fully responsive.',
    tags: ['HTML', 'CSS', 'JS'],
    category: 'Landing Page',
    colorVar: '#8B5CF6',
    placeholderSvg: (
          <>
                      <rect x="5" y="5" width="70" height="10" rx="2" opacity="0.4"/>
            <rect x="5" y="20" width="40" height="25" rx="2" opacity="0.3"/>
            <rect x="50" y="20" width="25" height="12" rx="2" opacity="0.3"/>
            <rect x="50" y="35" width="25" height="10" rx="2" opacity="0.2"/>
            <rect x="5" y="50" width="70" height="5" rx="2" opacity="0.2"/>
          </>
        ),
  },
  {
    title: 'Login & Signup UI',
    description:
      'Authentication UI with glassmorphism cards and form validation.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    category: 'UI Design',
    colorVar: '#EC4899',
    placeholderSvg: (
          <>
                      <rect x="20" y="8" width="40" height="44" rx="4" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.4"/>
            <rect x="28" y="18" width="24" height="3" rx="1" opacity="0.5"/>
            <rect x="28" y="25" width="24" height="6" rx="2" opacity="0.3"/>
            <rect x="28" y="35" width="24" height="6" rx="2" opacity="0.3"/>
            <rect x="28" y="44" width="24" height="5" rx="2" opacity="0.6"/>
          </>
        ),
  },
  {
    title: 'Personal Portfolio Website',
    description:
      'Dark-themed developer portfolio with a project showcase.',
    tags: ['HTML', 'CSS', 'JS'],
    category: 'Portfolio',
    colorVar: '#F59E0B',
    // The one verified, public project artifact: this site's actual source
    // (public repo, confirmed via the GitHub API). Not a Live Demo — no
    // deployment exists; the link goes to the code, which is real.
    repoUrl: 'https://github.com/devssiyam/portfolio',
    placeholderSvg: (
          <>
                      <circle cx="40" cy="20" r="12" opacity="0.3"/>
            <rect x="15" y="36" width="50" height="3" rx="1" opacity="0.5"/>
            <rect x="22" y="43" width="36" height="3" rx="1" opacity="0.3"/>
            <rect x="28" y="50" width="24" height="4" rx="2" opacity="0.5"/>
          </>
        ),
    // Phase 12 — the one project with enough real, verifiable information
    // for a case file (every line below is source-backed):
    // - context: single page (one index); "first-year CSE student" is the
    //   site's own verbatim copy; "frontend and Shopify work" is his
    //   verbatim role ("Frontend Developer & Shopify Store Designer").
    // - role: git history has exactly one author (Siyam Uzzaman).
    // - technicalDecisions: AUDIT.md observations of the frozen baseline
    //   (verified against its source: single local <script>, no CDNs;
    //   token-based :root stylesheet) + Phase 11's verified facts (zero
    //   image files) + the React migration (package.json).
    // Dimensions with no source content (problem, approach, challenges,
    // solution, results) are deliberately absent — never invented.
    caseStudy: {
      context:
        'A single-page portfolio for a first-year CSE student, presenting his frontend and Shopify work.',
      role: 'Sole developer — the only author on the repository.',
      technicalDecisions: [
        'The original build uses no external JS libraries — the typing effect, scroll reveal, and counters are hand-rolled vanilla JS.',
        'One token-based stylesheet — `:root` custom properties drive color, spacing, and typography.',
        'Inline SVG only — the repository contains zero image files.',
        'Now rebuilt in React (Vite + TypeScript) — you are reading the migrated build.',
      ],
    },
  },
  {
    title: 'Dashboard UI Design',
    description:
      'An analytics dashboard with sidebar nav, stat cards, charts, and data tables. Dark mode ready.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    category: 'Dashboard',
    colorVar: '#10B981',
    placeholderSvg: (
          <>
                      <rect x="5" y="5" width="18" height="50" rx="2" opacity="0.4"/>
            <rect x="27" y="5" width="48" height="10" rx="2" opacity="0.4"/>
            <rect x="27" y="20" width="22" height="15" rx="2" opacity="0.3"/>
            <rect x="53" y="20" width="22" height="15" rx="2" opacity="0.3"/>
            <rect x="27" y="39" width="48" height="16" rx="2" opacity="0.25"/>
          </>
        ),
  },
];
