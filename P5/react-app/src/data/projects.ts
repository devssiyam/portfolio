import type { Project } from '../types/content';

const GITHUB_REPO = 'https://github.com/devssiyam/devs.siyam.git';

export const projects: Project[] = [
  {
    title: 'Modern Tech Store UI',
    description:
      'A sleek e-commerce interface for a tech product store featuring product listings, cart, and checkout flow.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    category: 'E-Commerce UI',
    colorVar: '#3B82F6',
    demoUrl: '#',
    repoUrl: GITHUB_REPO,
    placeholderSvg: `<rect x="5" y="5" width="70" height="50" rx="4" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.4" /><rect x="10" y="12" width="25" height="3" rx="1" opacity="0.6" /><rect x="10" y="18" width="18" height="3" rx="1" opacity="0.4" /><rect x="10" y="28" width="28" height="16" rx="2" opacity="0.3" /><rect x="42" y="28" width="28" height="16" rx="2" opacity="0.3" /><circle cx="65" cy="15" r="8" opacity="0.2" />`,
  },
  {
    title: 'Shopify Product Page',
    description:
      'Custom Shopify product page with liquid templates, dynamic sections, and conversion-focused layout design.',
    tags: ['Shopify', 'Liquid', 'CSS'],
    category: 'Shopify',
    colorVar: '#96BF48',
    demoUrl: '#',
    repoUrl: GITHUB_REPO,
    placeholderSvg: `<rect x="5" y="5" width="70" height="50" rx="4" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.4" /><circle cx="30" cy="28" r="14" opacity="0.3" /><rect x="48" y="14" width="22" height="3" rx="1" opacity="0.6" /><rect x="48" y="20" width="16" height="3" rx="1" opacity="0.4" /><rect x="48" y="30" width="12" height="5" rx="2" opacity="0.5" /><rect x="48" y="39" width="18" height="3" rx="1" opacity="0.3" />`,
  },
  {
    title: 'Responsive Landing Page',
    description:
      'A high-converting landing page with hero, features, testimonials, and CTA sections. Fully responsive.',
    tags: ['HTML', 'CSS', 'JS'],
    category: 'Landing Page',
    colorVar: '#8B5CF6',
    demoUrl: '#',
    repoUrl: GITHUB_REPO,
    placeholderSvg: `<rect x="5" y="5" width="70" height="10" rx="2" opacity="0.4" /><rect x="5" y="20" width="40" height="25" rx="2" opacity="0.3" /><rect x="50" y="20" width="25" height="12" rx="2" opacity="0.3" /><rect x="50" y="35" width="25" height="10" rx="2" opacity="0.2" /><rect x="5" y="50" width="70" height="5" rx="2" opacity="0.2" />`,
  },
  {
    title: 'Login & Signup UI',
    description:
      'A modern authentication UI with glassmorphism cards, form validation, and smooth transitions.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    category: 'UI Design',
    colorVar: '#EC4899',
    demoUrl: '#',
    repoUrl: GITHUB_REPO,
    placeholderSvg: `<rect x="20" y="8" width="40" height="44" rx="4" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.4" /><rect x="28" y="18" width="24" height="3" rx="1" opacity="0.5" /><rect x="28" y="25" width="24" height="6" rx="2" opacity="0.3" /><rect x="28" y="35" width="24" height="6" rx="2" opacity="0.3" /><rect x="28" y="44" width="24" height="5" rx="2" opacity="0.6" />`,
  },
  {
    title: 'Personal Portfolio Website',
    description:
      'A premium dark-themed developer portfolio with smooth animations, typed.js, and project showcase.',
    tags: ['HTML', 'CSS', 'JS'],
    category: 'Portfolio',
    colorVar: '#F59E0B',
    demoUrl: '#',
    repoUrl: GITHUB_REPO,
    placeholderSvg: `<circle cx="40" cy="20" r="12" opacity="0.3" /><rect x="15" y="36" width="50" height="3" rx="1" opacity="0.5" /><rect x="22" y="43" width="36" height="3" rx="1" opacity="0.3" /><rect x="28" y="50" width="24" height="4" rx="2" opacity="0.5" />`,
  },
  {
    title: 'Dashboard UI Design',
    description:
      'An analytics dashboard with sidebar nav, stat cards, charts, and data tables. Dark mode ready.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    category: 'Dashboard',
    colorVar: '#10B981',
    demoUrl: '#',
    repoUrl: GITHUB_REPO,
    placeholderSvg: `<rect x="5" y="5" width="18" height="50" rx="2" opacity="0.4" /><rect x="27" y="5" width="48" height="10" rx="2" opacity="0.4" /><rect x="27" y="20" width="22" height="15" rx="2" opacity="0.3" /><rect x="53" y="20" width="22" height="15" rx="2" opacity="0.3" /><rect x="27" y="39" width="48" height="16" rx="2" opacity="0.25" />`,
  },
];
