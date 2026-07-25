import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'dark' | 'light' | 'outline' | 'outlineLight';
type Size = 'md' | 'lg';

const base =
  'group inline-flex items-center justify-center gap-2.5 font-mono text-[0.6875rem] font-medium uppercase tracking-[0.16em] transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-60';

const sizes: Record<Size, string> = {
  md: 'min-h-11 px-5',
  lg: 'min-h-14 px-7 text-xs',
};

const variants: Record<Variant, string> = {
  primary: 'bg-red text-white hover:bg-red-dark',
  dark: 'bg-navy text-white hover:bg-navy-700',
  light: 'bg-white text-navy hover:bg-concrete',
  outline: 'border border-navy/25 text-navy hover:border-navy hover:bg-navy hover:text-white',
  outlineLight: 'border border-white/35 text-white hover:bg-white hover:text-navy',
};

function classes(variant: Variant, size: Size, className?: string) {
  return [base, sizes[size], variants[variant], className].filter(Boolean).join(' ');
}

export function ButtonLink({
  href,
  children,
  variant = 'primary',
  size = 'md',
  className,
  withArrow = false,
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  withArrow?: boolean;
}) {
  return (
    <Link href={href} className={classes(variant, size, className)}>
      {children}
      {withArrow && (
        <ArrowRight
          aria-hidden="true"
          className="size-4 transition-transform duration-200 group-hover:translate-x-1"
        />
      )}
    </Link>
  );
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
}) {
  return (
    <button className={classes(variant, size, className)} {...props}>
      {children}
    </button>
  );
}

/** Understated text link with the red underline rule used across the site. */
export function TextLink({
  href,
  children,
  light = false,
  className,
}: {
  href: string;
  children: ReactNode;
  light?: boolean;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={[
        'group inline-flex items-center gap-2 border-b-2 border-red pb-1.5 font-mono text-[0.6875rem] font-medium uppercase tracking-[0.16em] transition-colors',
        light ? 'text-white hover:text-red-light' : 'text-navy hover:text-red',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
      <ArrowRight
        aria-hidden="true"
        className="size-3.5 transition-transform duration-200 group-hover:translate-x-1"
      />
    </Link>
  );
}
