# MIGRATION-PLAN.md — HTML/CSS/JS → React + TypeScript + Vite

Phase 02: planning only. Nothing in this repo is implemented, redesigned, or restructured
by this document. All names below are taken directly from the current `index.html`,
`style.css`, `script.js` (see AUDIT.md for the full inspection this plan is built on).

## Guiding constraint

The current site's identity — its content, its specific visual language (dark charcoal/
blue-violet accent, code-snippet motif, bracket logo, the specific decorative modules that
exist today), and its exact class/id names — is preserved through the migration. React/TS/
Vite is a delivery-mechanism change, not a design change. No component gets invented that
doesn't correspond to something already in the HTML.

## 1. Section → Component map

One component per existing `<section>`/major block, named after its existing id/class so the
mapping is traceable line-for-line back to `index.html`:

| Current section (id / class)          | Component               | Notes |
|---|---|---|
| `#home` `.hero`                       | `Hero.tsx`               | Includes badge, title, subtitle, typing text, actions, stats, avatar visual, code card |
| `#about` `.about`                     | `About.tsx`              | Profile card + bio + highlights + actions (WhatsApp/CV links) |
| `#skills` `.skills`                   | `Skills.tsx` + `SkillCard.tsx` | 8 skill cards, data-driven (see §4) |
| `#projects` `.projects`               | `Projects.tsx` + `ProjectCard.tsx` | 6 project cards, data-driven |
| `#services` `.services`               | `Services.tsx` + `ServiceCard.tsx` | 5 service cards, data-driven |
| `.stats` (no id)                      | `Stats.tsx`               | 4 counters, data-driven |
| `#testimonials` `.testimonials`       | `Testimonials.tsx` + `TestimonialCard.tsx` | 3 testimonials, data-driven |
| `#contact` `.contact`                 | `Contact.tsx`             | Info cards + socials + form |
| `.navbar` / `#navbar`                 | `Navbar.tsx`              | Logo, desktop menu, Hire Me CTA, hamburger |
| `.mobile-overlay` `#mobileOverlay`    | folded into `Navbar.tsx`  | Tied 1:1 to hamburger state, not independently reusable |
| `.footer`                             | `Footer.tsx`              | |
| `#loader` `.loader`                   | `Loader.tsx`              | |
| `#backToTop` `.back-to-top`           | `BackToTop.tsx`           | |
| `#cursor` `#cursorFollower`           | `CustomCursor.tsx`        | Kept as its own component so it can be toggled/removed as a unit later without touching layout components |

Shared/cross-cutting, not tied to one section:
- `.section-header` / `.section-tag` / `.section-title` / `.section-subtitle` /
  `.text-accent` → `SectionHeader.tsx` (small shared component; used identically by
  Skills/Projects/Services/Testimonials/Contact today).
- `.btn` variants (`--primary`, `--outline`, `--ghost`, `--sm`, `--lg`, `--full`) →
  `Button.tsx`, since the ripple effect and variant classes are already a de facto shared
  component in the CSS/JS, just not extracted in HTML.
- `.container` → layout primitive, likely a plain CSS class kept as-is rather than a
  component (no behavior, purely a width constraint).

## 2. Asset map

Per AUDIT.md, there are no binary assets — only inline SVG and CSS-drawn graphics. Migration
implication:
- Icon SVGs (nav bracket text, social icons, service/skill icons, arrows) →
  extracted as small `.tsx` icon components or kept as inline SVG in JSX (same markup,
  moved as-is). Given the number of one-off icons, a single `icons.tsx` barrel of the
  exact existing `<svg>` markup is lower-risk than pulling in an icon library (an icon
  library would be a generic-architecture substitution AUDIT.md and GLOBAL CONTROL both
  rule out — the current hand-drawn icons stay).
- Hero avatar SVG (`#avatarGrad` gradient + shapes) and About profile SVG (`#profileGrad`)
  → kept as inline SVG inside `Hero.tsx` / `About.tsx`; gradient `id`s must be de-duplicated
  or scoped (two elements currently reuse similar gradient defs across sections rendered on
  the same page — not a bug today since they're always both present, but worth flagging for
  Phase 03 so React doesn't render duplicate DOM ids if components ever conditionally mount).
- Google Fonts `<link>` tags → moved to `index.html` (Vite's HTML entry) unchanged, or to a
  `@import`/`<link>` in the root — no change in loading strategy, since AUDIT.md notes the
  existing graceful fallback (`-apple-system, BlinkMacSystemFont, sans-serif`) and that
  behavior should not regress.
- Favicon (inline SVG data URI) → unchanged, moved to `index.html` head as-is.

## 3. Data map (content → typed data, not hardcoded JSX)

The repeated card sections are the clearest, lowest-risk place to introduce typed data
instead of copy-pasted JSX, without changing anything visual:

- `skills: Skill[]` — `{ name, iconSvgId, colorVar, percent }` for the 8 skill cards
  (HTML5 96%, CSS3 98%, JavaScript 78%, Responsive Design 90%, Shopify 92%, Liquid 90%,
  UI/UX Design 85%, GitHub 92% — exact figures from the current markup, not re-estimated).
- `projects: Project[]` — `{ title, description, tags[], category, demoUrl, repoUrl,
  colorVar }` for the 6 project cards. **Flag:** AUDIT.md risk #8 — all 6 currently share one
  repo URL and most have `demoUrl: "#"`. The data model should have real per-project fields
  even though today's values are placeholders/duplicates, so fixing the content later doesn't
  require touching component code — but the placeholder values themselves are not invented
  fixes; they're carried over exactly.
- `services: Service[]` — `{ number, title, description, bullets[] }` for the 5 service
  cards.
- `stats: Stat[]` — `{ target, label }` for the 4 counters (20 projects / 15 clients / 2 years
  / 8 technologies — current real figures).
- `testimonials: Testimonial[]` — `{ quote, authorName, authorRole, avatarInitial,
  avatarColorVar }` for the 3 named testimonials (Shakib Khan, Khadizatul Kubra, Sowkot Aziz).
- `typingPhrases: string[]` — the 7 phrases already in `initTyping()`.
- `navLinks` — the 6 nav items (`#home`, `#about`, `#skills`, `#projects`, `#services`,
  `#contact`), currently duplicated as literal `<li>`s in HTML and referenced by id in 3
  separate JS modules (nav highlight, active-nav-on-scroll, smooth scroll) — a single source
  array removes that duplication safely.

Contact info (email, location, response time), social links (GitHub/LinkedIn/Facebook/
Instagram + their exact SVGs), and the WhatsApp number stay as they are structurally (they're
not repeated card grids), but should be pulled into one `siteConfig`/constants file so the
**email inconsistency already flagged in AUDIT.md (risk #1) has exactly one place to fix**
once that's decided — this plan does not resolve which email is correct.

## 4. Functionality → React equivalent map

Mapped from the 19 numbered `script.js` IIFEs to their React implementation, preserving
exact behavior (timing, thresholds, easing) rather than "improving" it:

| # | Current module | React equivalent | Risk |
|---|---|---|---|
| 1 | Loading screen | `Loader` component + `useEffect` on mount, same 1800ms timeout | Low |
| 2 | Custom cursor | `CustomCursor` + `useEffect` with rAF loop; must clean up listeners/rAF on unmount | Medium — rAF loops need explicit cleanup in React or they leak across route/remount |
| 3 | Sticky navbar scroll state | `useEffect` + scroll listener, or a small `useScrollPosition` hook | Low |
| 4 | Mobile hamburger menu | Local `useState<boolean>` in `Navbar`, replacing class toggles | Low |
| 5 | Active nav link (scroll-position based) | **Merge with #18** (see Risks §5.7) | Medium |
| 6 | Typing animation | `useEffect` + `setTimeout` chain, or extracted `useTypingEffect` hook; must clear timeout on unmount | Medium — same leak class as #2 |
| 7 | `checkAOS()` scroll-reveal | Generic `useInView`/`useScrollReveal` hook applied per-component in place of global `data-aos` scan | Medium — behavior must stay pixel-equivalent (80px threshold) |
| 8 | Skill bar animation | `useInView` in `SkillCard`, driving width via state, same 80ms stagger | Low |
| 9 | Animated counters | `useInView` in `Stats`/counter component, same rAF-count logic | Low |
| 10 | Contact form | `useState` for fields + submit state machine (idle/sending/success), same fake 2s delay **unless/until a real backend is added — not part of this migration** | Low (behavior), flagged separately for a real backend decision |
| 11 | Back to top | `useState` + scroll listener, same 500px threshold | Low |
| 12 | Smooth scroll anchors | Native `<a href="#...">` + `scrollIntoView`/`window.scrollTo`, same nav-height offset | Low |
| 13 | Button ripple | CSS-only today (JS just toggles a class) — can likely stay CSS-only, `Button` component toggles `rippling` state | Low |
| 14 | Card tilt (desktop only) | `useEffect` per card, same `matchMedia(max-width:768px)` guard preserved as-is | Medium — same leak class as #2/#6 |
| 15 | Navbar progress bar | Small standalone component created via `useEffect`, same gradient/positioning | Low |
| 16 | Skill card stagger (IntersectionObserver) | Folded into #8's `useInView` — same observer, avoid a second parallel observer | Low |
| 17 | Hero orb parallax (desktop only) | `useEffect` in `Hero`, same `matchMedia` guard | Medium — same cleanup risk |
| 18 | Active section highlight (IntersectionObserver) | **Merge with #5** — pick one mechanism, not both | Medium |
| 19 | DOMContentLoaded init / console branding | Root `App` `useEffect`; console log can move or be dropped (content decision, not migration risk) | Low |

## 5. Reusable logic worth extracting as hooks (not new behavior, same logic)

- `useScrollThreshold(px)` — backs navbar scrolled-state (#3) and back-to-top visibility
  (#11), which today are two copies of the same "compare `window.scrollY` to a number"
  pattern.
- `useInView(threshold, once)` — backs skill bars (#8/#16), counters (#9), and could replace
  the global `checkAOS()` (#7) if a per-element hook is preferred over one global scanner. **Migration risk:** `checkAOS()` today is timing-coupled to the loader (`initLoader` calls
  `checkAOS()` directly after its timeout) — that coupling needs to be preserved explicitly
  (e.g. loader's `onComplete` callback triggers the first reveal pass) or the first paint
  after the loader will look different from today.
- `useMediaQuery(query)` — backs the three separate `matchMedia('(max-width: 768px)')` desktop-only checks (#14, #17) plus the CSS-parallel breakpoint — one hook, one source of truth for that number instead of three independent copies of the literal `768`.
- `useCountUp(target, duration)` — the exact math in #9, extractable unchanged.

## 6. Migration risks (specific to this codebase, not generic React risks)

1. **rAF/timeout cleanup.** Modules #2 (cursor), #6 (typing), #14 (tilt), #17 (orb parallax)
   all run continuous loops or long timeout chains with no teardown, because in vanilla JS
   they run once for the page's lifetime. In React they must get `useEffect` cleanup
   functions (cancel rAF, clear timeout, remove listener) or a fast refresh / future
   route change will stack duplicate loops. This is the single highest-risk category.
2. **Duplicate active-nav-link logic (AUDIT.md risk #7).** #5 and #18 already both toggle
   `.active` on the same elements. Migrating both naively would carry the redundancy into
   React as two competing effects; the safe path is to pick one (IntersectionObserver,
   #18) during migration and drop #5's scroll-position version, but that is a
   **decision to make explicitly in Phase 03, not something to silently resolve here.**
3. **`checkAOS()` ↔ loader coupling** (see §5) — must be preserved or the first-load
   animation sequence changes.
4. **Global DOM id collisions in inline SVG** (`#avatarGrad`, `#profileGrad`) — currently
   safe because both always render; must stay safe if any component becomes conditionally
   rendered later (e.g. code-splitting Hero vs About).
5. **`cursor: none` device-class bug already flagged in AUDIT.md (risk #4)** — migrating
   `CustomCursor` verbatim carries the bug forward unchanged, which is correct for this
   migration (no design/behavior fixes yet) but should not be mistaken for "fixed by
   migrating."
6. **No `prefers-reduced-motion` support (AUDIT.md risk #5)** — same: carried forward as-is,
   not fixed during migration.
7. **CSS stays global, not CSS Modules/styled-components, in this plan.** Introducing
   scoped styling would touch every one of the ~1700 lines of `style.css` and is exactly the
   kind of speculative architecture change GLOBAL CONTROL prohibits. The plan is: keep
   `style.css` as one global stylesheet imported once in `main.tsx`, with existing class
   names untouched, so the CSS itself needs zero rewriting during componentization.
8. **Contact form has no backend (AUDIT.md risk #2).** Migrating it preserves the same fake
   submit; this plan does not add a real backend, since that's a functionality addition, not
   a migration step.
9. **Placeholder links / project data (AUDIT.md risks #3, #8).** Data-driven `projects[]`
   will faithfully encode today's placeholders (`href="#"`, shared repo URL) rather than
   inventing real ones — content correction is a separate, later decision.

## 7. Explicitly out of scope for this plan (per GLOBAL CONTROL + task boundaries)

- No component is implemented yet.
- No visual, layout, or copy change.
- No decision made here about removing/keeping cursor, tilt, orb-parallax, or typing effect —
  §6 only flags that migrating them carries specific technical risk, not that they should be
  removed.
- No generic component library, CSS-in-JS system, or icon package introduced.
- No resolution of the email conflict or placeholder links — those remain AUDIT.md items
  for a future content-fix phase, independent of the React migration itself.
