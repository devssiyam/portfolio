export interface NavLink {
  href: string;
  label: string;
}

export interface Skill {
  name: string;
  colorVar: string;
  /** SVG path data (single <path>) or a full inline SVG override for icons that need it. */
  iconPaths: string[];
  iconViewBox: string;
  /** Whether the icon paths should render with fill="currentColor" set on the <svg> itself. */
  fillOnSvg: boolean;
  /** data-width value driving the animated bar fill (kept exactly as authored, even where it
   *  differs from the displayed percent text below). */
  width: number;
  /** The percentage text actually displayed next to the bar (kept exactly as authored). */
  percent: number;
}

export interface Project {
  title: string;
  description: string;
  tags: string[];
  category: string;
  colorVar: string;
  demoUrl: string;
  repoUrl: string;
  placeholderSvg: string;
}

export interface Service {
  number: string;
  title: string;
  description: string;
  bullets: string[];
  iconPath: string;
}

export interface Stat {
  target: number;
  label: string;
}

export interface Testimonial {
  quote: string;
  authorName: string;
  authorRole: string;
  avatarInitial: string;
  avatarColorVar: string;
}
