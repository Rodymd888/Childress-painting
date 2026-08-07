'use client';

import {
  Children,
  isValidElement,
  cloneElement,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from 'react';

/**
 * SCROLL REVEAL
 * ---------------------------------------------------------------------------
 * v2 — this used to wrap every section in a Framer Motion component. Motion is
 * excellent, but paying ~34 KB of client JavaScript on every page for a fade
 * and a 22px translate is a bad trade.
 *
 * Now: one shared IntersectionObserver toggles a class, and the animation
 * itself lives in CSS (`.reveal` / `.is-visible` in globals.css). Framer Motion
 * is still used where it earns its weight — the hero's load sequence and the
 * mobile drawer's spring — but no longer on ordinary content.
 *
 * The component API is unchanged, so pages did not need rewriting.
 *
 * Reduced motion is handled purely in CSS: `.reveal` resolves to its final
 * state immediately, so content is never hidden from anyone.
 */

/* One observer for the whole document and not one per element. */
let observer: IntersectionObserver | null = null;
const registry = new WeakMap<Element, () => void>();

function getObserver() {
  if (typeof window === 'undefined') return null;

  if (!observer) {
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          registry.get(entry.target)?.();
          observer?.unobserve(entry.target);
          registry.delete(entry.target);
        }
      },
      /* Fire slightly before the element reaches the viewport edge so the
         transition is already underway when it becomes visible. */
      { rootMargin: '0px 0px -12% 0px', threshold: 0.08 },
    );
  }

  return observer;
}

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    /* No IntersectionObserver (very old browsers, some crawlers): show it. */
    if (!('IntersectionObserver' in window)) {
      setVisible(true);
      return;
    }

    /* Already in view on first paint — reveal without waiting for a scroll. */
    const rect = node.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setVisible(true);
      return;
    }

    const io = getObserver();
    if (!io) {
      setVisible(true);
      return;
    }

    registry.set(node, () => setVisible(true));
    io.observe(node);

    return () => {
      io.unobserve(node);
      registry.delete(node);
    };
  }, []);

  return { ref, visible };
}

type Direction = 'up' | 'left' | 'right' | 'scale' | 'none';

const directionClass: Record<Direction, string> = {
  up: '',
  left: 'reveal-left',
  right: 'reveal-right',
  scale: 'reveal-scale',
  none: '',
};

function classes(...values: (string | false | undefined)[]) {
  return values.filter(Boolean).join(' ');
}

export function Reveal({
  children,
  delay = 0,
  from = 'up',
  className,
  as: Tag = 'div',
  style,
}: {
  children: ReactNode;
  /** Seconds. Kept as seconds for API compatibility with the previous version. */
  delay?: number;
  from?: Direction;
  className?: string;
  as?: ElementType;
  style?: CSSProperties;
}) {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <Tag
      ref={ref}
      className={classes('reveal', directionClass[from], visible && 'is-visible', className)}
      style={{ ...style, '--reveal-delay': `${Math.round(delay * 1000)}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  );
}

/**
 * Staggers its direct children. Each child receives an incremental delay via a
 * CSS custom property, so the sequence costs nothing at runtime.
 */
export function RevealGroup({
  children,
  className,
  stagger = 0.08,
  as: Tag = 'div',
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  as?: ElementType;
}) {
  const items = Children.toArray(children).map((child, index) => {
    if (!isValidElement<{ style?: CSSProperties }>(child)) return child;

    return cloneElement(child, {
      style: {
        ...child.props.style,
        '--reveal-delay': `${Math.round(index * stagger * 1000)}ms`,
      } as CSSProperties,
    });
  });

  return <Tag className={className}>{items}</Tag>;
}

/**
 * A child of RevealGroup. Reads the delay the group assigned to it, so a grid
 * animates as one coordinated block instead of a scatter of separate fades.
 */
export function RevealItem({
  children,
  className,
  as: Tag = 'div',
  style,
  from = 'up',
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  style?: CSSProperties;
  from?: Direction;
}) {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <Tag
      ref={ref}
      className={classes('reveal', directionClass[from], visible && 'is-visible', className)}
      style={style}
    >
      {children}
    </Tag>
  );
}
