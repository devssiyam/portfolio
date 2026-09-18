# PHASE-04-NOTES.md — Content Architecture

## Finding

An audit of the current `react-app/` source (built in Phase 03) found that all repeated
real content is **already fully externalized** into typed data structures under
`src/data/`, with zero hardcoded duplicates left in any component:

| Category      | Data file                    | Type                  | Consuming component(s)           |
|----------------|-------------------------------|------------------------|-----------------------------------|
| Projects       | `src/data/projects.ts`        | `Project[]`            | `Projects.tsx` → `ProjectCard.tsx` |
| Skills         | `src/data/skills.ts`          | `Skill[]`               | `Skills.tsx` → `SkillCard.tsx`     |
| Services       | `src/data/services.ts`        | `Service[]`             | `Services.tsx` → `ServiceCard.tsx` |
| Testimonials   | `src/data/testimonials.ts`    | `Testimonial[]`         | `Testimonials.tsx` → `TestimonialCard.tsx` |

All types are declared in `src/types/content.ts`. Every value in these files (skill
percents/widths, project titles/descriptions/tags, service bullets, testimonial quotes/
authors) is the exact real content from the original `index.html`, carried over unchanged
in Phase 03 — this phase changed no values.

## "Experience" — confirmed not present in source

The task asked to also structure "experience" content. The original `index.html`,
`AUDIT.md`, and `MIGRATION-PLAN.md` were re-checked: there is no experience/timeline/
work-history section or repeated experience content anywhere in the source. The word
"experience" appears only twice, both as ordinary prose ("smooth user experience" in the
meta description/hero copy, and "web experiences" in the About bio) — neither is
structured, repeated, or card-like content, and neither describes a work-history item.

Per GLOBAL CONTROL's no-invented-content rule, no experience data structure was created.
Nothing was fabricated to fill this category.

## Verification performed

- Grepped every component file for literal strings matching known repeated content
  (project titles, skill names) outside of `src/data/` and `ProjectCard.tsx`'s type
  imports — zero matches found.
- Confirmed `Skills.tsx`, `Projects.tsx`, `Services.tsx`, `Testimonials.tsx` each import
  their array from `src/data/` and render via `.map()` with no inline literals.
- `npx tsc --noEmit` — 0 errors.
- `npm run build` — succeeds; output bundle hashes (`index-DsR3DQ2X.css`,
  `index-vzjdFBNe.js`) are byte-identical to the Phase 03 build, confirming no functional
  or content change occurred.
- jsdom smoke test against the built bundle, focused on the four affected sections:
  - Correct element counts (8 skill cards, 6 project cards, 5 service cards, 3
    testimonials).
  - Spot-checked real text survived intact (`HTML5`, `Shopify`, `Shopify Product Page`,
    `Personal Portfolio Website`, `Shopify Store Design`, `Shakib Khan`).
  - Zero console errors, zero warnings.
- Test script and jsdom dev-dependency removed after verification.

## Outcome

No source files were modified in this phase. The content architecture requested by
TASK 04 was already correctly in place from Phase 03; this phase is a verification/audit
pass confirming that, with no changes needed and no content invented for the
unsupported "experience" category.
