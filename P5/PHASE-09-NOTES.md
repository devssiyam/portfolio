# PHASE-09-NOTES.md — About

Implements TASK 09: redesign of the About section only. Everything
outside About is untouched (verified — see scope below).

## Design: "the profile"

An editorial profile, not the standard portrait + bio pattern. The
real content of this person is: a first-year CSE student (CSE'30) in
Bangladesh who is a Frontend Developer & Shopify Store Designer, with
a short bio, a defined technical area, three stated principles, and a
WhatsApp channel. That supports a two-part editorial spread in the
site's numbered-index language (header Phase 07, hero Phase 08):

```
[statement, left 7fr]                      [index panel, right 5fr]
First-year CSE student · Bangladesh 🇧     // what I work on
Hello! I'm Siyam 👋                          01  Frontend      HTML · CSS · JavaScript · React.js
(bio 1 — verbatim)                           02  Shopify       Store design & Liquid templating
(bio 2 — verbatim)                           03  Responsive & UI  Mobile-first, modern UI
[ Let's Talk → ]                             04  Now           CSE'30 — learning through projects
                                            ───────────────────────────
                                              Goal-Oriented / Mobile First / Performance
                                              (his three, verbatim)
```

**Communicates naturally:** who he is (kicker + greeting + bio 1),
what he actually works on (index rows 01–03, from his own words and
the real skill/service data), technical interests (rows 02–03),
current direction (row 04 + bio 1's "continuously improving my
development skills through projects and hands-on practice"). No
invented personality or claims; no generic biography or corporate
filler — every line is existing source content.

### Where each element comes from (all real)
- **Kicker** — "first-year … student" (his bio) + `siteConfig.location`
  ("Bangladesh 🇧🇩").
- **Greeting** — "Hello! I'm Siyam 👋" (his, verbatim, kept — it is his
  voice, not filler).
- **Bios** — both paragraphs, verbatim.
- **Row 01 Frontend / "HTML · CSS · JavaScript · React.js"** — his own
  sentence in bio 1 ("I work with HTML, CSS, JavaScript, and React.js").
- **Row 02 Shopify / "Store design & Liquid templating"** — service 01
  ("Shopify Store Design … liquid templates") + skills (Shopify,
  Liquid) + typing phrases.
- **Row 03 Responsive & UI / "Mobile-first, modern UI"** — skills
  (Responsive Design, UI/UX Design) + his principle ("Responsive
  design is non-negotiable") + the old "Modern UI" info chip.
- **Row 04 Now / "CSE'30 — learning through projects"** — the old
  "CSE'30" chip + bio 1's "…improving my development skills through
  projects and hands-on practice".
- **Principles** — his three labels and lines, verbatim, compacted
  from cards to rows (same words, less chrome).
- **Action** — "Let's Talk" → the real WhatsApp deep link
  (`siteConfig.whatsappHref`).

### Removed (explicit decisions — recorded, not silent)
| Removed | Why | Content lost? |
|---|---|---|
| Fake avatar + profile column + "🎓 Frontend Developer" badge | No real photo exists in the repo (same rule as hero/About portrait); badge content is carried by the kicker + statement + row 04 | No |
| Three info chips (Bangladesh / Frontend Developer \| CSE'30 / Shopify Design & Modern UI) | Content redistributed to kicker + statement + rows 02/03/04 | No |
| "Download CV" button | Dead link (`href="#"`, no file) — an AUDIT-flagged open item; a redesign does not carry a dead action. Re-add when a real CV exists | No (link was dead) |
| Highlight cards | → compact principle rows, same words | No |

### Restraint / consistency
The index is a bordered solid panel (`var(--bg-card)` + hairline) —
no glass, no blur, no shadow, no glow (verified zero on about rules).
Mono is used for the identity labels (kicker, `// what I work on`,
row descriptions, principle lines) exactly as the header/hero
establish; Geist for labels/headings (Phase-06 trailing block). Left-
set, spacious, 7/5 asymmetric.

## Scope (what changed vs. what didn't)

Changed:
- `src/components/About.tsx` — restructured to statement + index
  panel (avatar/profile/info-chips/CV/highlight-cards removed).
- `src/styles/style.css` — §9 ABOUT rewritten in place; the three
  dead about rules in the 768px block removed. The 1024px
  `.about__grid { gap }` rule is unchanged and still applies; the
  768px `.about__grid { grid-template-columns: 1fr }` is kept
  (the new layout stacks the same way, left-set).

Not touched (verified):
- Legacy `P5/index.html|script.js|style.css` — git-clean.
- `data/skills.ts`, `data/services.ts`, `siteConfig`, the Skills and
  Services sections (the index *references* that real data's content
  in editorial form; it does not duplicate or alter the data or those
  sections' own rendering).
- All other components, hooks, data, the Phase-05/06/07/08 CSS
  blocks, all non-About sections, the AOS mechanism (statement =
  fade-right, panel = fade-left, as before).
- One now-dead Phase-06 selector remains in the trailing block
  (`.about__highlight h4`) — harmless, block left intact.

## Verification (26/26 PASS, 0 console errors)

- `npx tsc --noEmit` — 0 errors. `npm run build` — succeeds (JS
  265.49 kB — shrank vs Phase 08 with the removed markup; CSS
  34.06 kB). `npm run lint` — 0 errors, 3 pre-existing warnings.
- jsdom behavioral simulation on the production bundle (no browser in
  this sandbox — responsive verified at the minified-CSS level):
  - **Content, real & verbatim:** kicker (student + location),
    greeting, both bios word-for-word; index label; 4 numbered rows
    with exact labels + descriptions; 3 principles verbatim; Let's
    Talk → exact WhatsApp deep link.
  - **Removals confirmed absent:** no profile/avatar/badge, no info
    chips, no highlight cards, no SVG portrait in About, no dead CV
    (no `[download]`, no "CV" anchor).
  - **Composition:** real `<aside>` panel, 7/5 asymmetric grid,
    bordered solid panel, mono identity labels.
  - **Responsive (built CSS):** 768px single column, left-set (no
    centering); 1024px keeps the tighter grid gap.
  - **Restraint:** zero blur/glow/shadow on any about rule.
  - **Regression:** all structural counts unchanged (8 skills, 6
    projects, 5 services, 3 testimonials, 4 stats, 6 nav links);
    hero (Phase 08) and header (Phase 07) intact; loader/cursor/
    footer/6 sections present.
- Documented env limit (same as Phases 07/08): no real-browser visual
  pass possible in the sandbox — a visual check in a browser is
  recommended before deploy.

## Known pre-existing issues carried forward (unchanged)
All AUDIT.md / Phase 03–08 items remain open: email conflict, fake
contact form, placeholder `#` links, shared project repo URL (on the
6 project cards), **missing CV file** (About no longer references a
dead CV link — re-add the button once a real CV exists), `cursor: none`
device-class bug, no `prefers-reduced-motion`, testimonial initials,
skill width/percent mismatches, `Button.tsx` dead code, `useAosReveal`
dead `rafRef`, 3 lint warnings.

## This checkpoint
- ZIP: `portfolio-backups/phase-09-about.zip` — index.html,
  script.js, style.css (unmodified originals) + AUDIT.md +
  MIGRATION-PLAN.md + PHASE-03/04/05/06/07/08/09-NOTES.md + full
  react-app/ source (no node_modules, no dist).

## Next task
Awaiting instruction (not started, not assumed).
