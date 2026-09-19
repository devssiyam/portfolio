# PHASE 28 — SECURITY HARDENING

**Status:** COMPLETE. Audited the entire app for real-world
client-side risks. **3 genuine issues fixed** (one raw-HTML sink, one
lockfile-integrity drift, no security policy at all); everything else
audited and verified clean. No new dependencies. No behavior changes
(all 13 suites green, 546 checks).

## Fixes

### 1. Raw-HTML sink eliminated (the app's only one)
`Projects.tsx` rendered the 6 project wireframes with
`dangerouslySetInnerHTML={{ __html: project.placeholderSvg }}`.
The data is static and local (no untrusted input path today), but a
string→HTML sink is the one code shape that turns any future data
mistake into an XSS. Fix (no new library, no behavior change):
- `data/projects.ts` → `data/projects.tsx`; each `placeholderSvg`
  string is now a React element tree (`<><rect …/><circle …/></>`).
- `Glyph` renders the elements directly — no parser, no string-to-
  HTML path anywhere in the app.
- `Project.placeholderSvg` type: `string` → `ReactNode`.
Verified: 0 `dangerouslySetInnerHTML` in source; built DOM renders
6 tiles with 34 real SVG shapes; tsc/lint/build green.

### 2. Lockfile integrity restored (`npm ci` state)
`npm ls` showed **34 extraneous top-level packages** in
`node_modules` — a full jsdom tree (+css-tree, parse5, undici, …)
that is in **no** `package.json` and **not** in `package-lock.json`
(test-only packages installed with `--no-save` at some point).
Consequence: the installed tree was not reproducible from the
lockfile — a supply-chain hygiene failure (unpinned, untracked code
in the dependency tree).
Fix:
- jsdom (the only thing that needed it) installed at the workspace
  root `/home/user` — **outside the git repository**, resolved by
  the QA suites via normal module walk-up.
- `npm ci` in `react-app/` — `node_modules` now matches
  `package-lock.json` exactly: 0 extraneous, 0 invalid,
  `npm audit` = **0 vulnerabilities**, dependency set unchanged
  (the 9 declared packages).

### 3. Security policy added (static-site mechanism)
GitHub Pages cannot set custom HTTP headers, so `<meta>` is the only
mechanism for this static site. Both added to `index.html` (source
+ built):

```
Content-Security-Policy:
  default-src 'self'; script-src 'self';
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  font-src https://fonts.gstatic.com;
  img-src 'self' data:; connect-src 'self';
  object-src 'none'; base-uri 'self';
  frame-ancestors 'none';
  form-action 'self' mailto: whatsapp:
Referrer-Policy: no-referrer
```
Every directive is derived from what the built app actually loads
(verified, no browser needed): the only executable script is the
same-origin module bundle (the `application/ld+json` block is not
executable and not governed by `script-src`); the only external CSS
is Google Fonts; the app makes **zero** XHR/fetch/WebSocket calls;
`mailto:`/`whatsapp:` are the only programmatic navigations (the
contact form is a JS composer — no real form submission);
`frame-ancestors 'none'` is the meta-CSP clickjacking protection
(equivalent of `X-Frame-Options: DENY`). The sole stated trade-off:
`'unsafe-inline'` in `style-src` — required for React inline style
**attributes** (they cannot be hashed without a build-pipeline
change); the meaningful protections (`script-src 'self'`,
`object-src 'none'`, `connect-src 'self'`, `frame-ancestors 'none'`,
`base-uri 'self'`) are all in force. If the site ever moves to a
host with header support, the policy should move to an HTTP header
where style hashes make `'unsafe-inline'` droppable (documented in
the index.html comment).

## Audited — verified clean (no fix needed)

- **XSS/DOM**: after fix 1, zero raw-HTML sinks; zero
  `innerHTML/outerHTML/document.write/eval/new Function`; zero
  string-form timers; all rendered links are
  `https:/mailto:/whatsapp:/#` (no `javascript:`, no plain
  `http://`); all 7 `target="_blank"` links carry
  `rel="noopener noreferrer"`.
- **User input**: the single input path (contact form) feeds only
  the mailto composer — every field passes through
  `encodeURIComponent`, the recipient is the static
  `siteConfig.contactEmail` constant (no open-redirect vector), and
  input never reaches any DOM-write API. Proven by the suite: an
  `<img onerror>`/`<svg onload>` payload in all four fields composes
  a structurally safe URL and injects **zero** elements/handlers.
  (The task's own caveat honored: the form's client-side validation
  is UX, not security — there is no backend to protect.)
- **Embeds/external code**: zero iframes/embeds/objects; no
  external `<script>`; Google Fonts is the only third party
  (documented Phase 22 decision) and is now scope-limited by the CSP
  to stylesheet + fonts only.
- **Secrets/env**: no keys/tokens/passwords/credentials in source or
  HTML; no `import.meta.env`/`process.env`; no `.env` files. The
  JSON-LD email is the site's intentional public contact address
  (also shown in Contact/Footer) — not an exposure.
- **Dependencies**: `npm audit` 0 vulnerabilities; lockfile v3 in
  sync; dependency set unchanged (nothing added — "no unnecessary
  libraries" honored; no sanitizer lib needed once the sink is gone).
- **Debug/production exposure**: zero `console.*`/`debugger` in
  source (Phase 26); no source maps in `dist/`; no dev-server/HMR
  markers in the built bundle.
- **Not applicable, stated plainly**: no backend exists (a static
  site — no server-side security was invented); client-side
  "validation" was never claimed as security.

## Verification (31/31 PASS)

- `security28` suite 31/31: sink absence (A), URL/embed/link safety
  in the built DOM (B), input-path proof with a live injection
  attempt (C), secrets/env (D), `npm audit` + lockfile match (E),
  CSP/referrer structure (F), debug exposure (G), runtime health
  (H).
- Regressions: P26 audit 50, a11y 86, responsive 60, contact 33,
  footer 33, interaction 35, motion 27, experience 28, SEO 54,
  functional 45, P25 quality 42, P27 polish 12 — **all green
  (546 checks total)**.
- `tsc --noEmit` 0; `oxlint` 0/0 (27 files).
- Build: CSS 31.23 kB (6.05 gz) unchanged; JS 260.56 kB (80.41 gz,
  +0.5 kB from the SVG element trees); index.html 7.88 kB
  (CSP/referrer metas + their documentation comment).
