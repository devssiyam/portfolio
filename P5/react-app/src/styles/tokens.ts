/**
 * Mirrors the breakpoint values documented in style.css's
 * "BREAKPOINTS (reference only)" comment block, added in Phase 05.
 * CSS custom properties cannot be read inside @media query conditions,
 * so these are the same three literal pixel values, kept in one place
 * for the TS/JSX side (useMediaQuery, useCardTilt, Hero's orb parallax)
 * instead of being repeated as magic numbers at each call site.
 *
 * Do not change these numbers without also updating the matching
 * @media rules in style.css — they must stay in sync, since the CSS
 * breakpoints are what actually reflow the layout.
 */
export const breakpoints = {
  tablet: 1024,
  mobile: 768,
  mobileSm: 480,
} as const;

export const mediaQuery = {
  tablet: `(max-width: ${breakpoints.tablet}px)`,
  mobile: `(max-width: ${breakpoints.mobile}px)`,
  mobileSm: `(max-width: ${breakpoints.mobileSm}px)`,
} as const;
