'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';
import type { ElementType, ReactNode } from 'react';

type RevealProps = {
  children: ReactNode;
  /** Seconds to wait before animating. Use to stagger sibling elements. */
  delay?: number;
  /** Direction the element travels in from. */
  from?: 'up' | 'left' | 'right' | 'none';
  className?: string;
  /** Render as a different element so semantics stay correct. */
  as?: ElementType;
};

const DISTANCE = 24;

/**
 * Scroll-triggered reveal. Animates once, never re-runs, and collapses to a
 * plain fade-free render when the visitor prefers reduced motion.
 *
 * The element is laid out at its final position from the first paint — only
 * opacity and transform change — so this never causes layout shift.
 */
export function Reveal({
  children,
  delay = 0,
  from = 'up',
  className,
  as = 'div',
}: RevealProps) {
  const reduceMotion = useReducedMotion();
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  if (reduceMotion) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  const offset =
    from === 'up'
      ? { y: DISTANCE }
      : from === 'left'
        ? { x: -DISTANCE }
        : from === 'right'
          ? { x: DISTANCE }
          : {};

  const variants: Variants = {
    hidden: { opacity: 0, ...offset },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2, margin: '0px 0px -80px 0px' }}
    >
      {children}
    </MotionTag>
  );
}

/**
 * Wraps a list so children reveal in sequence. Pair with <RevealItem>.
 */
export function RevealGroup({
  children,
  className,
  stagger = 0.08,
  as = 'div',
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  as?: ElementType;
}) {
  const reduceMotion = useReducedMotion();
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  if (reduceMotion) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={{ visible: { transition: { staggerChildren: stagger } } }}
    >
      {children}
    </MotionTag>
  );
}

export function RevealItem({
  children,
  className,
  as = 'div',
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}) {
  const reduceMotion = useReducedMotion();
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  if (reduceMotion) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      variants={{
        hidden: { opacity: 0, y: DISTANCE },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
        },
      }}
    >
      {children}
    </MotionTag>
  );
}
