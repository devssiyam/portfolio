# PHASE 33 — PRODUCTION READINESS

**Status:** COMPLETE. Audited everything that can break after real
deployment. **1 genuine, deployment-blocking issue found and fixed**
(absolute asset URLs vs the site's documented subpath
deployment address); everything else audited clean. One test-harness
line updated to follow the fix.

## The fix (genuine issue)

**`base: './'` in `vite.config.ts` — relative asset URLs.**
The site's declared canonical address, in all 7 documented places
(canonical, og:url, og:image, twitter:image, robots Sitemap:,
sitemap loc, Person schema `url` — provenance documented in
Phase 23), is the GitHub Pages **project-site subpath**
`https://devssiyam.github.io/portfolio/`. Vite's default `base: '/'`
emitted `src="/assets/index-…js"` + `href="/assets/index-…css"` —
root-absolute. Deployed to the subpath, the browser would request
`https://devssiyam.github.io/assets/…` → 404 on BOTH the JS and the
CSS → completely blank page. With `base: './'` the built HTML
references `./assets/…`, which resolves correctly at **any**
deployment depth (subpath, root, custom domain) with no deployment
assumption. Safe by construction: the app is a single document with
no client-side routing (in-page `#` anchors only), so relative asset
URLs have no downside.
- Proven over HTTP after the fix: dist served under `/portfolio/`
  (the exact documented geometry) returns 200 for the document AND
  `/portfolio/assets/*.js|css` (pre-fix these would have 404'd);
  root geometry also 200 across the board.
- JS/CSS file content is byte-identical to Phase 32 (same content
  hashes); only the URL prefixes in `index.html` changed.

**`preview: { allowedHosts: true }`** — local-verification only
(`vite preview` host allowlist for proxied preview hosts). No effect
on build output or the deployed site; commented as such in the
config.

## Audited clean (evidence per item)

- **Production build/configuration** — `npm run build` =
  `tsc -b && vite build` (type-check gates every build, clean);
  output 7.88 kB HTML / 31.23 kB CSS (6.05 gz) / 260.52 kB JS
  (80.40 gz); no build warnings; no sourcemaps in dist (default
  off — verified: zero `.map` files); no dev-mode branches in src
  (`import.meta.env.DEV` grep: none).
- **Vite base / public paths** — fixed above; `public/` (og-image,
  robots, sitemap) copied to dist root and verified 200 at both
  geometries.
- **SPA routing / direct navigation / refresh** — no router exists;
  the only URL space is the document + in-page `#` anchors
  (7 anchor hrefs ↔ 7 section ids, all present in the built DOM).
  Refresh/deep-link on any served URL is a static-file concern with
  nothing to break; unknown paths 404 at the host, as expected for
  a single-URL site (no 404.html — deliberately not invented).
- **Env vars / secret exposure** — zero `import.meta.env` /
  `process.env` in src; no `.env*` files; all contact/social values
  live in `src/data/siteConfig.ts` (documented single source,
  Phase 16); nothing secret is in the bundle (grep of the built JS
  shows only the public social/contact values).
- **Debug leftovers** — zero `console.*` / `debugger` / TODO /
  FIXME in src (the single grep hit is a Phase 28 doc comment
  describing the removed console branding); no `/src/main.tsx` or
  dev references in dist; React production build (no dev
  warnings in the runtime test).
- **Fonts / images / asset paths** — Google Fonts via two
  `preconnect`s + one `css2` link (Geist, Inter, Fira Code,
  `display=swap`); all https; `font-src` CSP matches
  `fonts.gstatic.com`; zero `<img>` in the DOM (og-image.png is
  meta-only, verified 200); inline-SVG favicon is a `data:` URI —
  no favicon 404 surface.
- **Favicon/icons** — data-URI SVG present and CSP-compatible
  (`img-src 'self' data:`).
- **Title / meta / description / canonical** — all present and
  mutually consistent (title = og:title = twitter:title;
  description = og:description = twitter:description); canonical
  single, self-consistent with og:url; `og:locale` /
  `twitter:creator` intentionally omitted (documented in Phase 23 —
  would assert a region / X handle the real data does not have).
  Values are all source-based (git author, hero tagline,
  repo-verified socials).
- **robots / sitemap / Open Graph** — robots.txt `Allow: /` +
  Sitemap line; sitemap.xml = the single real URL, lastmod = build
  date; all three use the same documented address; all verified
  200 with correct content-types.
- **Internal / external links** — internal: 7 `#` anchors ↔ 7
  section ids. External (all from siteConfig, all well-formed
  https): github.com/devssiyam (+ /portfolio in the footer nav),
  linkedin /in/siyam-uzzaman, web.facebook profile id,
  instagram /siyam_uzzaman; `mailto:devs.siyam@gmail.com`;
  `whatsapp://send?phone=8801330585129` (matches +8801330585129).
  CSP `form-action` names `mailto:` + `whatsapp:` (Phase 28) so
  those programmatic navigations are covered.
- **HTTPS-dependent behavior** — zero secure-context-only APIs in
  src (no crypto.subtle/serviceWorker/geolocation/storage/
  clipboard); zero non-https network references (the only
  `http://` strings in the bundle are XML namespace identifiers —
  not requests); the meta-CSP works identically over http and
  https. Site runs the same over both.
- **Caching / resource behavior** — every asset is content-hashed
  (`index-<hash>.js|css`) → immutable-caching safe at any host;
  `index.html` is unhashed by design (freshness is the host's
  job — GitHub Pages sends `max-age=600, must-revalidate` on HTML
  and long-lived on hashed assets; not controllable from a static
  site and not a defect); `crossorigin` attributes present on the
  asset tags.

## Production-like runtime (actually run)

- `vite preview --host 0.0.0.0` (real production dist): `/`,
  both hashed assets, robots.txt, sitemap.xml, og-image.png → all
  200 with correct content-types; asset tags in served HTML are
  `./assets/…`.
- Subpath simulation (dist served under `/portfolio/`): document
  + all assets + robots/sitemap/og-image → all 200 (the exact
  documented deployment geometry that the pre-fix build would have
  broken).
- HTTP boot test: HTML + bundle **fetched over HTTP**, bundle
  evaluated (jsdom cannot execute external module scripts — the
  same sandbox limitation the P29/P32 harnesses work around) →
  441 root nodes, 7/7 sections, header/footer/backToTop/h1,
  correct title, **zero** console errors / exceptions /
  rejections.

## Verification battery (post-fix)

- `tsc --noEmit`: clean.
- oxlint: 0 warnings / 0 errors (27 files, 116 rules).
- `vite build`: sizes identical to Phase 32; JS/CSS hashes
  unchanged (content untouched by the base change).
- Runtime regression (42-check harness; A7 asset-reference scan
  updated to accept the new `./assets/` prefix — test-side only):
  42/42 PASS.
- Cross-device regression (25-check Phase 32 suite): 25/25 PASS.

## Decision

The one deployment-blocking defect (subpath 404 → blank page) is
fixed with a single documented config line; the build is now
deployment-location-agnostic. No metadata was changed (all values
already source-based and consistent); nothing was invented.
