# PHASE-03-NOTES.md — React Foundation

Implements MIGRATION-PLAN.md. Original `index.html`/`script.js`/`style.css` are kept in
this zip unmodified (byte-diff verified) alongside the new `react-app/` project — nothing
in the live site was touched; this is the new parallel implementation.

## What was built

`react-app/` — Vite + React 19 + TypeScript project.

- `index.html` — same meta/SEO tags, favicon data-URI, and Google Fonts links as the
  original, moved into the Vite HTML entry unchanged.
- `src/styles/style.css` — the original stylesheet, copied byte-for-byte (verified via
  `diff`), imported once in `main.tsx`. No CSS Modules/styled-components introduced, per
  MIGRATION-PLAN.md §6.7.
- `src/types/content.ts` — shared types for all data-driven content.
- `src/data/` — `navLinks`, `typingPhrases`, `skills`, `projects`, `services`, `stats`,
  `testimonials`, `siteConfig`. Every value (skill percents/widths, project text, service
  bullets, testimonial quotes, stat targets, the two conflicting emails, placeholder
  `href="#"` links, the shared GitHub repo URL) is carried over exactly as authored — see
  "Known pre-existing issues carried forward" below.
- `src/hooks/` — `useScrollThreshold`, `useMediaQuery`, `useAosReveal`, `useCountUp`,
  `useInView`, `useTypingEffect`, `useCardTilt`, `useSmoothScroll`: each is a direct
  extraction of the matching `script.js` module's exact logic/timing/easing, per
  MIGRATION-PLAN.md §4/§5.
- `src/components/` — one component per section (`Loader`, `CustomCursor`, `Navbar`,
  `Hero`, `About`, `Skills`/`SkillCard`, `Projects`/`ProjectCard`, `Services`/
  `ServiceCard`, `Stats`, `Testimonials`/`TestimonialCard`, `Contact`, `Footer`,
  `BackToTop`, `ScrollProgressBar`) plus shared `SectionHeader`, `Button`, and an
  `icons.tsx` barrel for icons reused across components (GitHub, social icons).
- `src/App.tsx` — wires everything together; wires `Loader`'s completion callback
  directly into the AOS-reveal trigger (preserving the loader→checkAOS coupling flagged
  in MIGRATION-PLAN.md §5/§6.3) and reproduces the DOMContentLoaded console branding
  (module 19).

## Explicit decisions made (per MIGRATION-PLAN.md's own requirement not to resolve these silently)

1. **Active-nav-link duplication (AUDIT.md risk #7, plan §6.2):** only module 18's
   IntersectionObserver-based section highlight was kept in `Navbar.tsx`. Module 5's
   scroll-position version was dropped as redundant. This is a behavior decision made
   explicitly here, not a silent merge.
2. **`checkAOS()` ↔ loader coupling (plan §5/§6.3):** preserved via `Loader`'s
   `onComplete` prop, called by `App.tsx` exactly where the original called `checkAOS()`
   directly after its `1800ms` timeout.
3. **rAF/timeout cleanup (plan's highest-risk item, §6.1):** `CustomCursor`,
   `useTypingEffect`, `useCardTilt`, and the orb parallax effect in `Hero` all have
   explicit `useEffect` cleanup (cancel rAF, clear timeout, remove listeners). Verified
   under `<StrictMode>` (which double-invokes effects in dev) with no duplicate loops or
   leaked listeners observed.

## Known pre-existing issues carried forward unresolved (not fixed by this migration)

Per AUDIT.md and MIGRATION-PLAN.md §6/§7, none of the following were touched:
- Two conflicting email addresses (`devs.siyam@gmail.com` vs `devs.siyam@email.com`).
- Contact form has no real backend — same fake 2s send + 5s reset.
- 7 placeholder `href="#"` links (Live Demo buttons, Download CV).
- `cursor: none` gated by max-width media query, not `hover`/`pointer` capability.
- No `prefers-reduced-motion` handling.
- All 6 project GitHub links point to the same repo URL.

## Verification performed

- `npx tsc --noEmit` — passes with zero errors.
- `npm run build` — succeeds (`tsc -b && vite build`), producing a working `dist/`.
- `vite preview` served the built app successfully (confirmed via `curl`).
- A jsdom-based smoke test mounted the production bundle and confirmed:
  - Zero thrown/console errors, zero warnings (aside from expected network-resource
    failures for Google Fonts/local CSS, which jsdom cannot fetch and are not code
    defects).
  - All 22 structural DOM checks passed: every section (`#home`, `#about`, `#skills`,
    `#projects`, `#services`, `#testimonials`, `#contact`) present; correct counts for
    nav links (6), skill cards (8), project cards (6), service cards (5), testimonials
    (3), stats items (4); loader, cursor, back-to-top, typing-text, send button, and
    success-message elements all present.
  - Console branding log fires correctly on mount.
- `src/styles/style.css` diffed against the original `style.css` — byte-identical.
- Test script and dev/preview server processes removed after verification; nothing left
  running.

## Explicitly out of scope for this phase (per GLOBAL CONTROL + task boundaries)

- No visual/layout/copy redesign.
- No content fixes (emails, placeholder links, project repo URLs) — still pending a
  separate content-fix phase.
- No `prefers-reduced-motion` support added.
- No icon library, CSS-in-JS system, or generic component library introduced.
- No backend added to the contact form.
