# PHASE-08-NOTES.md — Hero

Implements TASK 08: redesign of the Hero section only. Everything
outside the hero is untouched (verified — see scope below).

## Design: "the masthead"

An editorial masthead composition instead of the standard
centered/split hero — built **only from content that already exists
in the source** (no invented claims, stats, personality, or
positioning; no generic AI copy):

```
● Available for freelance work — Bangladesh 🇧     (kicker, mono status line)

Frontend Developer                                (H1 — the exact role,
& Shopify Store                                   Geist 800, accent on the
Designer                                          differentiator)

I create modern, responsive, and visually attractive
websites with clean UI and smooth user experience. (his own one-liner, verbatim)

I specialize in [Liquid Templates▍]                (typing line — the identity)

[ View Projects → ]  [ Email Me ]                  (the two real actions)

Siyam Uzzaman — first-year CSE student, CSE'30     (byline, mono — personal)

                    ┌────────────────────┐
                    │ ● ● ●              │   (the code card, now a
                    │ const developer =  │    captioned <figure> —
                    │   name: "Siyam…"   │    the one real visual asset)
                    └────────────────────┘
                    stack — HTML5 · CSS3 · JavaScript · Shopify
```

**Why this composition (not the standard layout):** the real content
supports an editorial spread — status, role, one-liner, specialty,
actions, identity byline — set left in an asymmetric 7/5 grid beside
the code card as a captioned figure. The old layout's right column was
a *fake* portrait (illustrated placeholder person) with rings, orbs,
and floating badges around it; with the fake assets gone, the code
card — the site's actual identity motif — becomes the figure. Left-set
and asymmetric rather than centered: spacious, personal, confident.

### What each element is (all real)
- **Kicker** — the real availability status ("Available for Freelance
  Work", exact original wording) + `siteConfig.location`
  ("Bangladesh 🇧🇩" — real source value; not upgraded to a city the
  source never states). Mono, pulsing status dot (kept from the old
  badge — a status indicator, not decoration).
- **H1** — the exact original role text, original 3-line breaks,
  original accent span on "& Shopify Store" (the differentiator).
- **Subtitle** — his own one-liner, verbatim.
- **Typing line** — kept unchanged: it *is* the identity (7 real
  phrases from `data/typingPhrases`).
- **Actions** — exactly two, both real and available:
  - **View Projects → `#projects`** (the in-page section). The
    original pointed at the shared placeholder GitHub repo URL — an
    AUDIT.md flagged item that is not a real per-project
    destination — so the honest real destination is the section
    itself.
  - **Email Me → `mailto:devs.siyam@gmail.com`** (`siteConfig.heroEmail`).
  - WhatsApp deliberately stays where it already lives (About's
    "Let's Talk") — not tripled.
- **Byline** — "Siyam Uzzaman — first-year CSE student, CSE'30": name
  (real, in code card/footer/title), "first-year … student" (his
  About bio, verbatim words), "CSE'30" (his own notation from the
  About info card). The personal, specific context — nothing
  invented.
- **Figure** — the code card (unchanged content: his name/role/
  passion object, unchanged traffic-light dots) as a real
  `<figure>` with a `<figcaption>`: "stack — HTML5 · CSS3 ·
  JavaScript · Shopify" — the old floating badges' real tech names,
  preserved as a caption instead of deleted.

### Removed (explicit decisions — recorded, not silent)
| Removed | Why | Content lost? |
|---|---|---|
| Fake avatar portrait + rings | No real photo exists in the repo; a generic illustrated person is not a "real asset" and contradicts "personal/specific" | No |
| 3 orbs + parallax effect (`Hero.tsx` effect, refs, `useMediaQuery` import) | Pure decoration; the effect drops with its targets | No |
| Floating tech badges | Replaced by the figure caption with the same real names | No — preserved as caption |
| Hero stat trio (20+/15+/2+) | Concise: the complete stat band (20/15/2/8) remains in the Stats section below — the hero trio was a truncated duplicate | No — Stats section keeps all four |
| `hero__stats` markup | with the trio | No |

### Restraint (carried from the header's language)
Code card is now **solid `var(--bg-card)`** — the old
`rgba + backdrop-filter: blur(10px)` + `shadow-lg` removed (no
glass/blur/glow on hero surfaces). Actions are quiet 1px boxes in the
Phase-07 header language (primary = accent border/text, hover fill).
No new decoration added. The `.hero__grid` background texture and the
scroll cue are kept (existing identity, restyled mono).

## Scope (what changed vs. what didn't)

Changed:
- `src/components/Hero.tsx` — restructured to the masthead (kicker,
  byline, figure+caption, two real actions; orbs/parallax/avatar/
  rings/badges/stats removed).
- `src/styles/style.css` — §8 HERO SECTION rewritten in place
  (redesign = replacement); the 768px hero rules rewritten (single
  column, **stays left-set** — no centered mobile hero); the 480px
  hero rules reduced to the actions stack (now `flex-start`). The
  1024px hero rules (gap + title clamp) are unchanged and still
  apply.

Not touched (verified):
- Legacy `P5/index.html|script.js|style.css` — git-clean.
- `useTypingEffect`, `typingPhrases`, `siteConfig`, `stats.ts` —
  single sources of truth, unchanged (the Stats section renders the
  full band from `stats.ts`).
- All other components, hooks, data, the Phase-05/06/07 CSS blocks,
  all non-hero sections, the AOS reveal mechanism (content/figure
  keep their `data-aos` hooks).
- Two dead Phase-06 selectors remain in the trailing block
  (`.hero__badge`, `.hero__stat-*` font-family rules) — harmless
  (match nothing now); not edited, to keep Phase-06's block intact.

## Verification (31/31 PASS, 0 console errors)

- `npx tsc --noEmit` — 0 errors. `npm run build` — succeeds (JS
  267.16 kB — the removed parallax/avatar code shrank the bundle vs
  Phase 07; CSS 34.01 kB). `npm run lint` — 0 errors, 3 pre-existing
  warnings.
- jsdom behavioral simulation on the production bundle (no browser in
  this sandbox — responsive verified at the minified-CSS level,
  actions at the behavior level):
  - **Content:** kicker = real status + real location; H1 = the exact
    role in 3 lines with the accent span; subtitle verbatim; typing
    prefix/text/cursor intact; byline exact; code card content exact;
    figure + caption exact (real skill names); scroll cue kept.
  - **Removals:** no avatar/rings/orbs/visual/float-badges/hero-stat
    in the DOM; Stats section still carries the full 4-item band.
  - **Actions (tested):** View Projects → `#projects`, click →
    smooth-scroll fired (scrollTo called, not blocked); Email Me →
    `mailto:devs.siyam@gmail.com`, native (no interception); no
    GitHub placeholder CTA remains in the hero.
  - **Responsive (built CSS):** base = `minmax(0,7fr)
    minmax(0,5fr)` asymmetric grid; 768px = single column with **no
    centered-hero rules** (stays left-set, subtitle 42ch); 480px =
    actions stack `flex-start`.
  - **Restraint:** zero `backdrop-filter`/`blur` on any hero rule;
    code card solid `var(--bg-card)`; kicker/byline/caption mono;
    actions unfilled at rest.
  - **Regression:** all structural counts unchanged (8 skills, 6
    projects, 5 services, 3 testimonials, 4 stats, 6 nav links);
    Phase-07 header intact (skip link, caret, CTA link);
    loader/cursor/footer/6 sections present.
- Documented env limit (same as Phase 07): no real-browser visual
  pass possible in the sandbox — a visual check in a browser is the
  recommended first manual step before deploy.

## Known pre-existing issues carried forward (unchanged)
All AUDIT.md / Phase 03–07 items remain open: email conflict, fake
contact form, placeholder `#` links, shared project repo URL (the
hero no longer uses it — it remains on all 6 project cards), missing
CV file, `cursor: none` device-class bug, no
`prefers-reduced-motion` (new hero motion is only the pre-existing
dot pulse / typing / scroll bob), testimonial initials, skill
width/percent mismatches, `Button.tsx` dead code, `useAosReveal`
dead `rafRef`, 3 lint warnings.

## This checkpoint
- ZIP: `portfolio-backups/phase-08-hero.zip` — index.html, script.js,
  style.css (unmodified originals) + AUDIT.md + MIGRATION-PLAN.md +
  PHASE-03/04/05/06/07/08-NOTES.md + full react-app/ source (no
  node_modules, no dist).

## Next task
Awaiting instruction (not started, not assumed).
