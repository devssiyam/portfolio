// Central place for contact/social values that are not repeated card grids.
// NOTE (Phase 17, doc-level correction): the old header note claimed the two
// conflicting emails were "intentionally NOT resolved" — that is no longer
// true: Phase 16 resolved AUDIT risk #1, contactEmail is the real,
// git-verified address, and it is the single canonical email in the app.
export const siteConfig = {
  // Phase 16: the old 'devs.siyam@email.com' had a non-existent TLD
  // (AUDIT risk #1 — the conflicting address). This is the real one:
  // verified as his committed git author address
  // (git log: Siyam Uzzaman <devs.siyam@gmail.com>) and the same
  // address the Hero's Email Me button has always used.
  // Phase 31: the redundant heroEmail key (same value, Hero-only) is
  // gone — this is the one email key the app reads.
  contactEmail: 'devs.siyam@gmail.com',
  // Phase 24 (functional): the WhatsApp click-to-chat deep link requires the
  // number in INTERNATIONAL format (country code, no leading zero, no '+') —
  // per WhatsApp's click-to-chat spec, `phone=01330585129` (local format) is
  // not a valid destination from a browser. Same real number, Bangladesh
  // country code +880. The number the visitor SEES stays the familiar local
  // format (whatsappDisplay) — display and destination are now separated.
  whatsappHref: 'whatsapp://send?phone=8801330585129',
  whatsappDisplay: '01330585129',
  location: 'Bangladesh 🇧🇩',
  responseTime: 'Within 24 hours',
  social: {
    // Phase 16: the profile (verified real via the GitHub API in
    // Phase 11) instead of the old repo URL — a contact link should
    // point at the person, not at the old portfolio repo.
    github: 'https://github.com/devssiyam',
    linkedin: 'https://www.linkedin.com/in/siyam-uzzaman',
    facebook: 'https://web.facebook.com/profile.php?id=61567791733944',
    instagram: 'https://www.instagram.com/siyam_uzzaman',
  },
};
