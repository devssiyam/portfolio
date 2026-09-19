import type { Service } from '../types/content';

// Phase 13 — the agency-cliché cards are gone. What remains are the
// TWO TRADES his verbatim role statement names — "Frontend Developer
// & Shopify Store Designer" (Hero H1 / siteConfig) — so nothing is
// invented. The three old extra cards fold into these with nothing
// real lost:
// - "Landing Page Design"  → "landing pages" in trade 01 (real project:
//   "Responsive Landing Page").
// - "Responsive Web Design" → his verbatim subtitle ("modern,
//   responsive") and About index ("Mobile-first, modern UI") — a
//   capability, not a separate trade.
// - "UI Customization"     → the "clean UI" of his verbatim subtitle
//   (real skill: UI/UX Design).
// Every phrase below is source-backed:
// - "HTML, CSS, JavaScript, and React" — About index, verbatim.
// - "store UIs, landing pages, forms, dashboards" — the real project
//   kinds (Modern Tech Store UI / Responsive Landing Page / Login &
//   Signup UI / Dashboard UI Design).
// - "Custom Shopify product page" — the real project's own description.
// - "Store design & Liquid templating" — About index, verbatim.
// The cliché copy ("high-converting", "capture leads", "boost sales",
// "A/B Testing Ready", "4K displays", "Brand Consistency") is removed:
// no source evidence supports any of it.
export const services: Service[] = [
  {
    number: '01',
    title: 'Frontend Development',
    what: 'Websites and interfaces built with HTML, CSS, JavaScript, and React — store UIs, landing pages, forms, dashboards.',
    audience:
      'Anyone who needs a site or interface built — the kinds of work are listed in the projects above.',
    tech: ['HTML', 'CSS', 'JavaScript', 'React.js'],
    iconPath: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4',
  },
  {
    number: '02',
    title: 'Shopify Store Design',
    what: 'Custom Shopify stores and product pages — store design and Liquid templating.',
    audience: 'Store owners who want a custom build — not a stock theme.',
    tech: ['Shopify', 'Liquid'],
    iconPath: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z',
  },
];
