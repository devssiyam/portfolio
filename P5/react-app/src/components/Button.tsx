import { useState, type ReactNode, type AnchorHTMLAttributes, type ButtonHTMLAttributes } from 'react';

type CommonProps = {
  variant?: 'primary' | 'outline' | 'ghost';
  size?: 'sm' | 'lg' | 'full';
  children: ReactNode;
  className?: string;
};

type ButtonAsAnchor = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { as?: 'a' };
type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { as: 'button' };

type ButtonProps = ButtonAsAnchor | ButtonAsButton;

/**
 * Extracts the de-facto shared `.btn` component (variant classes + ripple
 * toggle) per MIGRATION-PLAN.md §1. The ripple effect itself is CSS-only
 * today (module 13 just toggled a class); this replicates that same
 * 600ms 'rippling' class toggle on click.
 */
export default function Button({ variant = 'primary', size, children, className = '', ...rest }: ButtonProps) {
  const [rippling, setRippling] = useState(false);

  function triggerRipple() {
    setRippling(true);
    window.setTimeout(() => setRippling(false), 600);
  }

  const classes = [
    'btn',
    `btn--${variant}`,
    size ? `btn--${size}` : '',
    rippling ? 'rippling' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  if (rest.as === 'button') {
    const { as: _as, ...buttonRest } = rest;
    return (
      <button
        className={classes}
        onClick={(e) => {
          triggerRipple();
          buttonRest.onClick?.(e);
        }}
        {...buttonRest}
      >
        {children}
      </button>
    );
  }

  const { as: _as, ...anchorRest } = rest as ButtonAsAnchor;
  return (
    <a
      className={classes}
      onClick={(e) => {
        triggerRipple();
        anchorRest.onClick?.(e);
      }}
      {...anchorRest}
    >
      {children}
    </a>
  );
}
