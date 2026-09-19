import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Phase 33 (production readiness): emit RELATIVE asset URLs (./assets/...)
  // instead of Vite's default absolute /assets/.... The site's declared
  // canonical address (canonical + og:url + robots + sitemap + Person
  // schema, Phase 23) is the GitHub Pages PROJECT-SITE subpath
  // https://devssiyam.github.io/portfolio/ — with default absolute paths
  // the browser would request https://devssiyam.github.io/assets/... and
  // 404 on both the JS and the CSS (blank page). Relative URLs work at
  // any depth (subpath, root, custom domain) and require no deployment
  // assumption; they are safe here because the app is a single document
  // with no client-side routing (in-page # anchors only).
  base: './',
  // Local-verification only: `vite preview` serves the production dist for
  // smoke-testing. allowedHosts:true lets the preview load under any
  // proxied host name. Has no effect on the build output or on the
  // deployed site (real caching/headers come from the host, not Vite).
  preview: { allowedHosts: true },
})
