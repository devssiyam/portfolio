// Central place for contact/social values that are not repeated card grids.
// NOTE: the two email addresses below are carried over exactly as they exist in the
// original markup (hero CTA vs. contact info card). This is a known, flagged
// inconsistency (AUDIT.md risk #1) and is intentionally NOT resolved by this migration.
export const siteConfig = {
  heroEmail: 'devs.siyam@gmail.com',
  contactEmail: 'devs.siyam@email.com',
  whatsappHref: 'whatsapp://send?phone=01330585129',
  location: 'Bangladesh 🇧🇩',
  responseTime: 'Within 24 hours',
  cvHref: '#', // "Download CV" — no real file target in the original markup
  social: {
    github: 'https://github.com/devssiyam/devs.siyam.git',
    linkedin: 'https://www.linkedin.com/in/siyam-uzzaman',
    facebook: 'https://web.facebook.com/profile.php?id=61567791733944',
    instagram: 'https://www.instagram.com/siyam_uzzaman',
  },
};
