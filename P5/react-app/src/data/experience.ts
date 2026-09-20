import type { ExperienceEntry } from '../types/content';

// Phase 14 — Experience. The source supports exactly ONE period
// (the present) and two real positions within it. Everything else —
// an organization (no university name exists anywhere in the
// source), dates, internships, employers — does not exist and is
// NOT invented.
//
// Per-line evidence:
// - "Computer Science and Engineering Student" — bio 1, verbatim
//   ("I'm a first-year Computer Science and Engineering student…").
// - "1st year · CSE'30" — "first-year" (bio 1 / Hero byline / About
//   kicker) + "CSE'30" (About index row 04 / old info chip).
//   No year range is written: the source gives no start date.
// - Entry 01 work — three verbatim fragments joined:
//   "continuously improving my development skills through projects
//   and hands-on practice" (bio 1) · "I work with HTML, CSS,
//   JavaScript, and React.js" (bio 1) · "learning through
//   projects" (About index row 04).
// - "Frontend Developer" — bio 1 verbatim ("…and Frontend Developer
//   passionate about…") + Hero H1.
// - Entry 02 work — "building modern, responsive, and
//   user-friendly web experiences" (bio 1 verbatim) · "Available
//   for freelance work — Bangladesh 🇧🇩" (Hero kicker verbatim) ·
//   the projects cross-reference + public portfolio source (factual,
//   verified in Phases 11/12).
export const experiencePeriod = 'Current';

export const experience: ExperienceEntry[] = [
  {
    number: '01',
    role: 'Computer Science and Engineering Student',
    period: "1st year · CSE'30",
    work: 'Continuously improving my development skills through projects and hands-on practice — working with HTML, CSS, JavaScript, and React.js, learning through projects.',
  },
  {
    number: '02',
    role: 'Frontend Developer',
    period: 'Current',
    work: "Building modern, responsive, and user-friendly web experiences — available for freelance work, Bangladesh 🇧🇩. The work is in the projects section; this portfolio's source is public.",
  },
];
