# Phase 16 — Contact (COMPLETE)

## Task
Redesign the Contact section using ONLY the actually-available contact
methods (email, GitHub, LinkedIn, WhatsApp, CV or any supplied method).
Keep it personal, clear, trustworthy. No invented contact details. No
fake form-success behavior without a real backend (honest frontend
validation/feedback is fine). Test every contact action + keyboard +
mobile. Build + checkpoint + stop.

## Design: "direct"
The section now says exactly what it is — contact Siyam directly — and
every method on the page is a real, working, verified channel. Two
columns:

- **Left — `// direct` panel** (bordered, solid, mono labels, no
  icons/blur/glow): Email / WhatsApp / Location / Response Time rows +
  the four supplied social links.
- **Right — honest mail composer**: the old fake form was deleted and
  replaced by a form that does one real, true thing: opens the
  visitor's own email app with a pre-filled message to the real
  address.

## Every method, checked against the source
| Method | Value | Evidence / decision |
|---|---|---|
| Email | `devs.siyam@gmail.com` | **Real — the git author address of this repo.** The old `devs.siyam@email.com` used a non-existent TLD (the exact AUDIT "conflicting emails" risk — now resolved: one canonical address everywhere, incl. the Hero "Email Me") |
| WhatsApp | `whatsapp://send?phone=01330585129` | From `siteConfig.whatsappHref`; the number is displayed exactly as the href carries it (raw digits — nothing reformatted) |
| Location | `Bangladesh 🇧🇩` | Source fact; shown as a plain text row, **not** a link |
| Response time | `Within 24 hours` | From the old Contact info; shown as a plain text row, **not** a link (no fabricated SLA) |
| GitHub | `https://github.com/devssiyam` | **Profile** — verified via GitHub API in Phase 11. Replaces the old `…/devs.siyam` repo URL, which (verified P11) contains no project code and misled visitors |
| LinkedIn / Facebook / Instagram | unchanged | Supplied in `siteConfig.social`; all `target="_blank" rel="noopener noreferrer"`, each labeled by its visible name (no icon-only buttons) |
| CV | — | **No CV line.** `cvHref` is `#` (placeholder) and no real file exists anywhere — a dead link is not a contact method. To be re-added when a real file is supplied |

## The fake form → honest mail composer
Deleted (fake without a backend): the 2-second fake "Sending..." state,
the 5-second fake "Message sent! I'll reply within 24 hours." success
card, the runtime-injected `.spin` keyframes, `#sendBtn`/`#contactSuccess`.

Replaced with a composer that only ever tells the truth:
- **Real validation, honest messages**: Name / Valid email / Message are
  checked; each error names exactly what's wrong ("Please enter your
  name." / "Please enter a valid email address." / "Please write a
  short message."); invalid fields get `aria-invalid` +
  `aria-describedby`, the field shakes (WAAPI, guarded — it silently
  degrades where `Element.animate` doesn't exist) and focus moves to the
  first invalid field.
- **Real action**: a valid submit builds
  `mailto:devs.siyam@gmail.com?subject=…&body=…` (default subject
  "Project inquiry"; custom subject honored; body = message +
  "— Name (email)") and opens it via a detached anchor click — the
  visitor's own mail client sends it. Nothing is invented, nothing is
  stored on this site (that is said, plainly, right on the form).
- **Honest status** (`aria-live`): "Opening your email app — the message
  is ready there to send." No "Message sent!" — the site cannot know
  that.
- No timers, no spinners, no success theater. `type="submit"` (Enter
  works), every field labeled with `htmlFor`/`id`.

## CSS
§15 fully rewritten: `.contact__direct` bordered panel, `.contact__row`
(90px mono label / value), `.contact__socials` grid, `.social-btn`
hover = border+color shift only (old glow/lift gone),
`.contact__form-card` + note/error/status styles, contact
`focus-visible` outlines. Media: 1024/768 single column (existing kept),
768 panel padding tightened, **480 rows stack** (label above value).
Zero `backdrop-filter`/blur/glow/shadow on contact rules. The
Phase-06 trailing block's one dead `.contact__info-card h4` font
selector remains by established convention (no markup targets it).

## Verification (33/33 PASS, 0 console errors)
- `tsc` 0 errors; build 37 files (CSS 35.83 kB / JS 263.53 kB);
  lint 0 errors, 3 pre-existing warnings.
- jsdom behavioral simulation: **real methods** (gmail link+text, fake
  `.email` gone from the whole page, WhatsApp href+display,
  location/response as facts, 4 safe labeled socials incl. the profile
  switch, no CV line, zero invented emails/phones); **form honesty**
  (labeled fields, honest note, real `type=submit`, no
  `#contactSuccess`/`#sendBtn`/"Message sent!"/"Sending..." — re-checked
  after the old fake-sent 2.7 s window); **real validation** (empty
  submit → all three honest errors + `aria-invalid`, no mailto; bad
  email caught; errors clear on fix); **real action** (mailto To = real
  email; default + custom subject; body carries message + sender;
  honest aria-live status, never "sent"); **keyboard** (focus-visible
  outlines in built CSS, natively focusable); **mobile** (1024/768
  1-column, 768 padding, 480 rows stack); **identity** (bordered solid
  panel, mono labels, zero blur/glow/shadow, old chrome gone);
  **full regression** (7 anchor sections, 6 nav, 0 dead links, 0
  `<img>`, hero gmail intact, other sections intact).
- Documented env limit (as Phases 07–15): no real-browser visual pass
  possible in sandbox.

## AUDIT items closed by this phase
- ~~Fake contact form~~ (AUDIT risk) — eliminated.
- ~~Conflicting emails / impossible TLD~~ — resolved:
  `devs.siyam@gmail.com` is now the single canonical address.
- GitHub social pointing at a repo with no code — now the profile.

## Still open (deliberately NOT assumed)
- CV: placeholder in config; add a real file to re-introduce it.
- Stats band's "15 Happy Clients" — still unsupported (Stats task).
- `prefers-reduced-motion` pass.
