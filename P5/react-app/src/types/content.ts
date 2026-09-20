import type { ReactNode } from 'react';

export interface NavLink {
  href: string;
  label: string;
}

export type SkillGroup = 'Frontend' | 'UI & Responsive' | 'Shopify' | 'Tools';

export interface Skill {
  name: string;
  colorVar: string;
  /** SVG path data (single <path>) or a full inline SVG override for icons that need it.
   *  Empty for skills with no icon asset in the source. */
  iconPaths: string[];
  iconViewBox: string;
  /** Whether the icon paths should render with fill="currentColor" set on the <svg> itself. */
  fillOnSvg: boolean;
  /** The real area this skill belongs to (Phase 10 — the grouping the actual
   *  skill set supports). */
  group: SkillGroup;
}

export interface Project {
  title: string;
  description: string;
  tags: string[];
  category: string;
  colorVar: string;
  /** Verified public source repository — Phase 11: set ONLY when the repo is
   *  real, public, and actually contains the work (checked against the
   *  GitHub API). Dead "#" demo links and the shared placeholder repo URL
   *  were removed; no link renders without a verified target. */
  repoUrl?: string;
  /** Per-project schematic wireframe (real baseline asset) — rendered as a
   *  glyph marker, not presented as a screenshot (no screenshots exist in
   *  the source). */
  /** Phase 28 (security): was a raw-SVG *string* rendered through
   *  dangerouslySetInnerHTML — the app's only raw-HTML sink. Now a
   *  React element tree: shapes are declared in data and rendered as
   *  elements (no parser, no string-to-HTML path, no new library). */
  placeholderSvg: ReactNode;
  /** Phase 12 — case study, rendered ONLY when it exists. Contains only
   *  dimensions with real, source-verified content for this project; the
   *  usual case-study shape is not padded (missing dimensions are simply
   *  absent, never invented). No project without a verified artifact has
   *  one. */
  caseStudy?: {
    context: string;
    role: string;
    technicalDecisions: string[];
  };
}

export interface ExperienceEntry {
  number: string;
  /** The role exactly as the source states it (Phase 14). */
  role: string;
  /** The period exactly as the source supports it — "no invented dates":
   *  the site only states "first-year" and the "CSE'30" cohort (Phase 14). */
  period: string;
  /** Responsibilities + relevant work — verbatim source fragments or
   *  factual cross-references only (Phase 14). */
  work: string;
}

export interface Service {
  number: string;
  title: string;
  /** What the service actually is — source-verified scope (Phase 13:
   *  the agency-cliché card copy — "high-converting", "capture leads",
   *  "boost sales", "A/B testing ready" — was removed; it has no
   *  source evidence). */
  what: string;
  /** Who it is for — the honest, minimal audience (Phase 13). */
  audience: string;
  /** The real tech the service is built with (from the About index /
   *  Skills / project data — nothing added). */
  tech: string[];
  /** Legacy line icon (real baseline asset) — kept in the data, not
   *  rendered: the editorial presentation has no icon tiles (Phase 13). */
  iconPath: string;
}


