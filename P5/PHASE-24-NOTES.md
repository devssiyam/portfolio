# PHASE 24 — FUNCTIONAL QA

**Status:** COMPLETE — 1 genuine functional defect found and fixed
(WhatsApp deep-link format). Every other tested behavior verified working
or verified already-correct from prior phases. Suite: 45/45. All 8
regression suites green. tsc 0 errors. oxlint 0/0.

## What was tested (production dist in jsdom + local HTTP + network)

| Area | Result |
|---|---|
| **Navigation** | 6 nav links → all 6 section targets exist; click intercepted by the smooth-scroll hook (preventDefault + `scrollTo(number, 'smooth')`); logo → `#home`; active-section IntersectionObserver fires and moves `active` + `aria-current` between sections (verified with a controllable IO stub); skip link keeps native fragment navigation |
| **Mobile menu** | opens (aria-expanded + class), focus moves to first link, Tab wraps last→first (trap), menu link click **closes + smooth-scrolls**, CTA closes + scrolls to `#contact`, Escape closes + **focus returns to hamburger** |
| **Project links** | exactly 1 external project link → `github.com/devssiyam/portfolio` (the site's REAL repo, public/main verified via API); the old shared placeholder repo (`devssiyam/devs.siyam`) is gone from the DOM (Phase 16 fix held) |
| **GitHub** | profile link exact `https://github.com/devssiyam` — **live, verified via authenticated API** (user exists, name "Siyam Uzzaman", 2 public repos); repo `devssiyam/portfolio` — **live, verified via API** (public, main) |
| **Live links** | complete link inventory: 8 anchor hrefs (all resolve), exactly 5 unique https URLs (4 site-declared socials + real repo), 3 mailto, 4 whatsapp — **no invented destination exists**; `a[href="#"]` = 0, no `javascript:`, every anchor has an href |
| **Socials** | 4 contact socials + footer text links match `siteConfig` exactly. Liveness: LinkedIn/Instagram (and Facebook) return **403 to non-browser agents (bot wall) — unverifiable from the sandbox, no evidence of death**; these are the site's own declared links (account data originated from his real GitHub profile, Phases 11/16) |
| **Email** | every mailto = `devs.siyam@gmail.com` (git-verified, single address); hero "Email Me" + contact row verified; form composes a real `mailto:` with correct address, typed subject, body = message + signature, "Project inquiry" fallback — captured via stubbed anchor click |
| **WhatsApp** | **defect found + fixed** (below); displayed number stays the familiar local `01330585129` (2 number-displaying links; the other 2 CTAs show "Let's Talk") |
| **CV** | no CV element/link anywhere (no real file exists — Phase 16/17 removal held; nothing re-added) |
| **Buttons** | exactly 3, all named: hamburger (toggles), submit (type=submit, full validation flow works), back-to-top (hidden at top, click → `scrollTo top:0 smooth`) |
| **Forms** | empty submit → 3 errors + `aria-invalid` + focus jumps to first invalid field; errors clear on valid input; success announced via live region; 0 page errors through the whole session |
| **Runtime / requests** | 0 uncaught errors in jsdom; **local HTTP smoke test on the built dist**: `/` 200 html (canonical + JSON-LD + og:image present), JS 200 `text/javascript`, CSS 200 `text/css`, `/og-image.png` 200 `image/png` byte-identical 1200×630, `/robots.txt` 200, `/sitemap.xml` 200; `/favicon.ico` 404 expected (page uses the inline data-URI icon, so no browser ever requests it); Google Fonts unreachable from the sandbox (no direct network) — the css2 URL is the standard pattern, verified in Phase 23's structure |

## The fix (1)

**WhatsApp deep link was in local format** — `whatsapp://send?phone=01330585129`.
WhatsApp's click-to-chat spec requires the `phone` parameter in
**international format** (country code, no leading zero, no `+`); a local
format is not a valid destination from a browser. Fixed in `siteConfig`:
`whatsappHref: 'whatsapp://send?phone=8801330585129'` (same real number,
Bangladesh country code +880 — not an invented destination). Display and
destination are now separated: new `whatsappDisplay: '01330585129'` keeps
the number the visitor sees exactly as before (Contact + Footer now use it
instead of deriving it from the href). All 4 hrefs (About, Services,
Contact, Footer) update automatically from the single config value.

## Nothing else needed fixing (verified, not assumed)

- No dead/placeholder links remain (`a[href="#"]` = 0 site-wide).
- No fake/invented destinations: the 5 external URLs are exactly the
  4 site-declared socials + the site's real repo.
- CV absence is correct (no file exists — adding one would be inventing).
- Navigation, menu, buttons, form, mailto composition all behave.

## Verification

- `npx tsc --noEmit` clean; `oxlint` 0/0; production build:
  JS 265.92 kB (82.05 gz), CSS 37.95 kB (7.47 gz)
- **functional suite 45/45** (10 navigation, 7 mobile menu, 4 project/
  GitHub, 10 socials/email/WhatsApp/CV, 5 buttons, 6 form incl. captured
  mailto address/subject/body, 2 runtime)
- HTTP smoke test on `vite preview` (production dist): all 6 real
  resources 200 with correct content types; og-image byte-identical
- Regressions: a11y 88/88, responsive 60/60, contact 33/33, footer
  33/33, interaction 35/35, motion 30/30, experience 28/28, SEO 54/54
  (contact + footer updated for the intentional WhatsApp format change)
