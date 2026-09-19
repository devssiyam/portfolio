# Phase 13 — Services (COMPLETE)

## Task
Redesign ONLY Services using genuinely supported services.
Communicate what I do / who it is for / practical value. No
invented services. No agency clichés, AI marketing, generic "digital
solutions" or fake guarantees. No repetitive card filling. Let real
services determine presentation. Test responsive. Checkpoint + stop.

## What the source actually supports
The strongest "what I do" statement in the repo is his verbatim role —
**"Frontend Developer & Shopify Store Designer"** (Hero H1 /
siteConfig). It names exactly TWO trades. Every other "service" claim
was checked against the source:

| Old card | Verdict | Where it folds |
|---|---|---|
| Shopify Store Design | **Real trade** (role + About index "Store design & Liquid templating" + real project "Shopify Product Page") | Trade 02 |
| Frontend Development | **Real trade** (role + About index stack + 5 real projects) | Trade 01 |
| Landing Page Design | Not a separate trade — a project kind (real project "Responsive Landing Page") | Trade 01 "what" (real project kinds) |
| Responsive Web Design | Not a separate trade — a capability (real skill "Responsive Design", About index "Mobile-first, modern UI", verbatim subtitle "modern, responsive") | subtitle + practice |
| UI Customization | Not a separate trade — capability (real skill "UI/UX Design", verbatim subtitle "clean UI") | subtitle |

Old card copy was agency cliché with zero source evidence:
"high-converting", "capture leads", "boost sales", "A/B Testing
Ready", "4K displays", "Brand Consistency", "UI/UX Audit & Revamp" —
**all removed**. The 5× "Get Started →" repetition is gone.

## Design: "the two trades"
- **Subtitle = his verbatim Hero sentence** — "I create modern,
  responsive, and visually attractive websites with clean UI and
  smooth user experience." That IS the "what I do + practical value"
  statement, in his own words (replacing the filler "Professional
  services tailored to grow your online presence").
- **Two editorial trade blocks** (no card grid): hairline-top
  `article`s in a 2-column spread — mono number, display title, then
  exactly the three asked-for dimensions as mono-labeled rows:
  - **WHAT** — real scope, source-backed.
    - 01: "Websites and interfaces built with HTML, CSS, JavaScript,
      and React — store UIs, landing pages, forms, dashboards."
      (About-index stack verbatim; the four kinds are the real
      projects: Tech Store UI / Responsive Landing Page / Login &
      Signup UI / Dashboard UI Design)
    - 02: "Custom Shopify stores and product pages — store design and
      Liquid templating." ("Custom Shopify product page" is the real
      project's own description; "Store design & Liquid templating"
      is the About index verbatim)
  - **FOR** — honest minimal audience.
    - 01: "Anyone who needs a site or interface built — the kinds of
      work are listed in the projects above." (Projects section IS
      above Services in DOM order — the claim is true, tested)
    - 02: "Store owners who want a custom build — not a stock theme."
      ("custom" is real; the contrast is what "custom" means)
  - **Tech tokens** (real, nothing added): 01 = HTML · CSS ·
    JavaScript · React.js (About index verbatim); 02 = Shopify ·
    Liquid.
- **One CTA** at the end — `// have a project in mind?` + "Let's Talk
  →" → real WhatsApp deep link (same pattern/href as About) — instead
  of five card links.

## Explicit decisions (all documented, none silent)
1. **Two trades, not five** — a third trade would have no source
   backing; the other three old cards fold in via real project kinds /
   capabilities (table above). Nothing real lost, nothing invented.
2. **Subtitle is his own verbatim sentence** — real copy carries the
   value statement; no new marketing text written.
3. **All cliché copy removed** — no "converting/leads/sales/A-B/4K/
   brand consistency/premium/flawless" anywhere in the section
   (tested). No fake guarantees, no numbers, no invented outcomes.
4. **No card grid / icon tiles / glow / tilt** — editorial hairline
   rows in the established index language (Skills/About/Projects);
   `useCardTilt` stays (Testimonials still use it). Section contains
   zero `<svg>` chrome.
5. **One CTA, real link** — `siteConfig.whatsappHref` (verified real
   pattern from About); no dead links.
6. **Legacy icon paths kept in data, not rendered** (Phase 10
   convention).

## Changes
- `src/types/content.ts` — `Service`: −`description`, −`bullets`,
  +`what`, +`audience`, +`tech[]`; `iconPath` documented as
  unrendered legacy.
- `src/data/services.ts` — 5 → 2 entries (the two trades), every
  phrase source-backed with the evidence table in file comments.
- `src/components/Services.tsx` — rewritten (header with verbatim
  subtitle, two trade blocks, one CTA); decision log in file header.
- `src/components/ServiceCard.tsx` — deleted.
- `src/styles/style.css` — §12 rewritten in place
  (`.services__trades`, `.services__trade` + `-num/-title/-row/
  -label/-text/-tech`, `.services__tech-token`, `.services__cta` +
  `-kicker/-link`); media: @1024 tighter gap (2 dead nth-child lines
  removed), @768 single column + trade breathing room + stacked CTA
  (2 dead lines removed), @480 trade rows stack (appended into main
  480 block). Phase-06 trailing block's `.service-card__title/
  __link` rules are now dead selectors — harmless, block intact
  (established convention).

Not touched: legacy originals (git-clean), all other sections/data/
components/hooks, nav, AOS mechanism.

## Verification (36/36 PASS, 0 console errors)
- `tsc` 0 errors; build succeeds (CSS 35.15 kB / JS 265.61 kB, 39
  files); lint 0 errors, 3 pre-existing warnings.
- `/tmp/services-test.mjs` (36 checks): **header** (real labels,
  verbatim Hero subtitle, filler gone); **trades** (exactly two,
  named by the verbatim role, numbered, old card titles absent, all
  WHAT/FOR text verbatim from data, projects-above claim DOM-true);
  **tech** (tokens = real stacks only, nothing added); **clean**
  (zero agency clichés, zero fake guarantees/outcomes/numbers);
  **CTA** (exactly one, real WhatsApp link, mono kicker);
  **structure** (no card grid/icon tiles/svg chrome, editorial
  articles); **interaction** (AOS wired, no tilt); **built CSS**
  (§12 card rules gone — only the two Phase-06 dead display-font
  selectors remain by convention, zero blur/shadow on services
  rules, mono identity, hairline rows); **responsive** (1024 gap /
  768 single column + breathing + stacked CTA / 480 rows stack —
  resolved against the actual media block); **full regression**
  (Projects case + case file + 5 rows + footnote, 9 skill tokens / 4
  groups, 4 stats / 3 testimonials / 6 nav, hero/about/header, zero
  dead links, 0 `<img>`, sections/loader/cursor/footer).
- Verification limit: no browser in sandbox — desktop/mobile behavior
  verified via jsdom simulation + built-CSS inspection.

## Blocker
None.
