# PHASE 23 — SEO

**Status:** COMPLETE — everything implemented/verified truthfully.
Suite: 54/54. All 7 regression suites green. tsc 0 errors. oxlint 0/0.

## Truthfulness standard

Every value shipped is taken from verified real data (git-verified facts,
the GitHub API checks of Phase 11/16, or the site's own declared content).
The Person schema is field-restricted by an explicit allow-list assertion in
the test suite — any invented field (skills, credentials, affiliations,
`worksFor`, `knowsAbout`, …) would fail the build. No keyword stuffing: the
existing `keywords` meta contains only 6 role descriptors that are literally
true (kept — factual, not stuffed); nothing added.

## The one judgment call: the canonical URL (documented, not silent)

The site is **not deployed anywhere** (verified in Phase 16 — no GitHub
Pages, no other hosting; README says "Portfolio: Coming Soon").
Canonical/sitemap/robots inherently need a real address, so the
**deterministic GitHub Pages URL for this exact repo** is used:

```
https://devssiyam.github.io/portfolio/
```

(owner `devssiyam`, repo `portfolio` — both verifiable facts about this
repository; GitHub's Pages URL scheme makes this address exact). It is the
**declared canonical address** and becomes live the moment Pages is enabled.
All 7 URL-bearing places are listed in the HTML comment so a future domain
move is one checklist: canonical, og:url, og:image, twitter:image,
sitemap.xml, robots.txt, Person `url`.

## What was implemented

| Item | State | Detail |
|---|---|---|
| title | verified | `MD SIYAM UZZAMAN | Frontend Developer & Shopify Designer` (57 chars, unchanged, real) |
| description | verified | 167 chars, real tagline + one truthful sentence, unchanged (Google truncates by pixels, not 160 chars) |
| canonical | **added** | repo-derived address (see above) |
| OG metadata | **extended** | added og:url, og:image (+width/height 1200×630), og:site_name; existing og:title/description/type verified (og:title === title) |
| social image | **created** | `public/og-image.png` → dist root. 1200×630 PNG, 64 KB, rendered (ImageMagick/DejaVu) from site data only: `// PORTFOLIO`, **MD SIYAM UZZAMAN**, *Frontend Developer & Shopify Store Designer*, *Based in Bangladesh*, favicon "S" motif, site palette. No invented claims. Verified byte-identical in dist |
| twitter card | **added** | summary_large_image + title/description/image (mirrors OG) |
| favicon | verified | inline SVG data URI survives the build (0 requests) |
| headings | verified | single h1, no skipped levels (re-asserted on the production DOM) |
| alt text | verified | zero `<img>` on the page; all 12 SVGs `aria-hidden` — nothing to miss |
| Person schema | **added** | JSON-LD: name (git author), jobTitle (hero tagline), url (canonical), email (git-verified, Phase 16), addressCountry (site's location line), sameAs = GitHub (API-verified Phase 11) + LinkedIn (site-declared). **No** image field (a branding card is not a person photo — not represented as one), no skills/credentials |
| sitemap | **created** | `public/sitemap.xml` → dist root. One `<url>` (single-page site), `<loc>` = canonical, `lastmod` = 2026-09-18 (real creation date, non-future — asserted) |
| robots | **created** | `public/robots.txt` → dist root. `User-agent: * / Allow: /` + absolute `Sitemap:` line (single-page site has nothing to disallow) |

## Deliberate omissions (documented)

- **og:locale** — would assert a locale/region the content doesn't have.
- **twitter:creator** — no verified X handle exists in the real data.
- **Person `image`** — the OG card is branding, not a photo; not
  misrepresented as one.
- **Facebook/Instagram in sameAs** — consumer profiles, unverified; the
  site's professional identifiers (GitHub, LinkedIn) carry the signal.
- **`<html>` lang, charset, viewport, author, og:type** — already correct.

## Verification (54/54 PASS)

- `npx tsc --noEmit` clean; `oxlint` 0/0; production build:
  dist/index.html 5.07 kB, JS unchanged (265.95 kB / 82.06 gz)
- **SEO suite 54/54**: 21 core-metadata checks on the **built**
  index.html (incl. truthfulness guards — no "award/certified/top-rated/#1"
  patterns in any description), 12 Person-schema checks (field
  allow-list, values cross-checked against `src/data/siteConfig.ts`),
  6 sitemap, 4 robots, 6 social-image (PNG signature, 1200×630 from IHDR,
  size, byte-identity with public/), 5 production-DOM checks (h1/heading
  order, zero img, named links, canonical + JSON-LD present, 0 errors)
- Regressions: a11y 88/88, responsive 60/60, contact 33/33, footer 33/33,
  interaction 35/35, motion 30/30, experience 28/28
