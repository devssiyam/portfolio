# AUDIT.md — Siyam Portfolio (Phase 01: Intake)

Snapshot audited: `portfolio.zip` as uploaded (index.html, style.css, script.js). No changes made.

## Structure

Single-page static site, no build tooling, no `package.json`, no framework.

- `index.html` (1137 lines) — one page, sections in order: loader → custom cursor → navbar →
  hero → about → skills → projects → services → stats → testimonials → contact → footer →
  back-to-top button → `script.js`.
- `style.css` (1704 lines) — one stylesheet. Token-based (`:root` custom properties for
  color/spacing/typography/radius/shadow/transition), then reset, then per-section blocks in
  the same order as the HTML, then 3 media queries at the end (1024px, 768px, 480px).
- `script.js` (630 lines) — 19 numbered, independent IIFE modules (loader, custom cursor,
  navbar, mobile menu, active-nav-on-scroll, typing animation, scroll-reveal, skill bars,
  counters, contact form, back-to-top, smooth scroll, button ripple, card tilt, orb parallax,
  section highlight, DOMContentLoaded init). No external JS libraries — everything (typing
  effect, scroll-reveal, counters) is hand-rolled vanilla JS replacing what are normally AOS/
  typed.js library features.

## Reusable code

Genuinely reusable, well-isolated:
- Design-token system in `:root` — colors, spacing scale, radii, shadows, easing curves.
- IIFE module pattern in `script.js` — each feature is self-contained and null-checks its DOM
  targets before running, so modules don't throw if a section is removed.
- `checkAOS()` scroll-reveal engine (module 7) — a working AOS replacement keyed off
  `data-aos` / `data-aos-delay` attributes already used throughout the HTML.
- Skill bar / counter animation logic (modules 8–9) — reusable count-up and width-fill
  utilities, generic over any `data-target` / `data-width` element.
- Card component patterns (`.skill-card`, `.project-card`, `.service-card`,
  `.testimonial-card`) are consistent, BEM-ish, and share the same visual language.

## Assets

No binary/image assets in the zip — everything visual is either:
- Inline SVG (icons, avatar illustration, project-card placeholder graphics, social icons), or
- CSS-drawn (gradients, orbs, rings, badges).
- One external font load: Google Fonts (`Inter`, `Fira Code`) via `<link>` — network
  dependency, no self-hosted fallback.
- Favicon is an inline SVG data URI (no separate file).
- No profile photo — the "about" and "hero" sections use a gradient/SVG placeholder avatar,
  not a real photo.

## Functionality (tested by serving locally)

All three files load correctly (200 OK) served over local HTTP; no fetch/network errors from
the page itself. Functionality present:
- Sticky navbar with scroll state, active-link highlighting (two separate implementations —
  see Risks), mobile hamburger menu with overlay, Escape-to-close.
- Hero typing animation cycling fixed phrases.
- Scroll-reveal (`data-aos`) on most sections.
- Animated skill bars and stat counters, triggered once on scroll into view.
- Contact form: **client-side only** — no backend/endpoint. "Send Message" runs a 2-second
  `setTimeout` and shows a canned success message; nothing is actually sent anywhere.
- Custom cursor + follower (desktop only, disabled under 768px width via CSS).
- Card tilt-on-mousemove and hero-orb parallax (desktop only, gated by the same 768px check).
- Smooth-scroll for in-page anchors, back-to-top button.
- Loader screen blocks scroll for 1.8s on every load.

## Dependencies

- **Runtime:** none (no npm packages, no CDN JS libraries). All effects are vanilla JS.
- **External network:** Google Fonts stylesheet (`fonts.googleapis.com` /
  `fonts.gstatic.com`), preconnected. If blocked, `--font-base` falls back to
  `-apple-system, BlinkMacSystemFont, sans-serif`, so it degrades gracefully.
- **Build/tooling:** none — the site is deployable as static files with no build step.

## Real content (confirmed present, not placeholder)

- Name: MD SIYAM UZZAMAN / Siyam Uzzaman, Bangladesh 🇧🇩, "Frontend Developer & Shopify Store
  Designer," first-year CSE student ("CSE'30").
- Real, working outbound links: GitHub (`github.com/devssiyam/devs.siyam.git` — used
  repeatedly as project + social link), LinkedIn (`linkedin.com/in/siyam-uzzaman`), Facebook,
  Instagram (`instagram.com/siyam_uzzaman`).
- Contact channels: a WhatsApp deep link (`whatsapp://send?phone=01330585129`) and email.
- Bio text, skill percentages (HTML5 96%, CSS3 98%, JS 78%, etc.), service descriptions, and
  testimonial quotes (3 named people with roles/locations) are all specific, written content —
  not Lorem Ipsum or generic filler.
- 6 project cards with individual titles/descriptions/tags, though most link to the same
  GitHub repo and use `href="#"` for "Live Demo" (see Risks).

## Risks / issues (observed only — not fixed)

1. **Three different email addresses** across the file: `devs.siyam@gmail.com` (hero CTA),
   `devs.siyam@email.com` (contact info card — `.email` is not a real TLD), and
   `siyamuzzaman@example.com` (form placeholder text, correctly not a real address). The first
   two conflict and one is likely a typo — needs the real address confirmed before any content
   pass.
2. **Contact form has no backend.** It only simulates sending client-side. Any visitor who
   submits it will believe their message was sent when it wasn't.
3. **7 placeholder `href="#"` links** — mainly "Live Demo" buttons on project cards with no
   real deployed URL, and the "Download CV" link (`download` attribute present, but no `href`
   file target).
4. **`cursor: none` on `<body>` is gated by a max-width media query, not `hover`/`pointer`
   capability.** A touch device wider than 768px (most tablets in landscape, some foldables)
   will get an invisible cursor with no fallback pointer — a usability bug on that class of
   device, independent of any design opinion.
5. **No `prefers-reduced-motion` handling anywhere in CSS or JS.** Loader, typing animation,
   orb parallax, card tilt, ripple, and scroll-reveal all run unconditionally regardless of the
   user's OS motion setting.
6. **Only 3 breakpoints** (1024px, 768px, 480px) vs. finer device coverage; nothing between
   768–1024 tablet portrait or below 480 is separately tuned besides one small block.
7. **Two independent, overlapping "active nav link" implementations** (`initActiveNav` at
   module 5, scroll-based, and `initSectionHighlight` at module 18, IntersectionObserver-based)
   both toggle the same `.active` class on the same links — redundant, and a latent source of
   flicker/race if they ever disagree.
8. **All 6 GitHub project links point to the same repo URL**
   (`github.com/devssiyam/devs.siyam.git`), including on projects with visibly different
   names/descriptions — likely a stand-in that was never given per-project repo links.
9. **Console branding log** (`console.log` with styled "🚀 Portfolio by..." message) — harmless
   but worth knowing it's there if a "clean console" requirement ever comes up.
10. **Loader forces `overflow: hidden` on body for 1.8s on every visit**, including repeat
    visits — no session/localStorage check to skip it after the first load.

## Safe migration path (if/when migration is later requested)

Not undertaken now — for planning only:

1. **Stage 0 (current):** static HTML/CSS/JS, verified working as-is.
2. **Stage 1 — content fixes only, no structural change:** resolve the email conflict, fill
   or remove placeholder `href="#"` links, decide on the "Download CV" target. Zero risk to
   layout/behavior.
3. **Stage 2 — introduce Vite without changing output:** wrap the existing HTML/CSS/JS in a
   Vite project (`vite build` treating current files as the entry point) so tooling exists
   without touching markup, styles, or scripts yet. Verifiable by diffing rendered output.
4. **Stage 3 — componentize in React/TS incrementally:** convert one section at a time
   (e.g., navbar first, since it's the most self-contained) into a typed component, keeping
   the same class names and CSS so visual regression is checkable by eye/diff before moving
   to the next section. Each of the 19 JS IIFEs maps fairly directly to either a `useEffect`
   hook or is replaced by native React state (e.g., mobile menu open/close, active nav link).
5. **Stage 4 — decide fate of decorative modules** (cursor, orb parallax, tilt, typing) as a
   deliberate design decision, not an incidental side effect of the migration.

Each stage should get its own checkpoint zip so a regression can be isolated to a specific
stage.
