import type { ReactNode } from 'react';
import { Reveal } from './Reveal';

type Props = {
  /** Mono label rendered in the red-ruled title block. */
  label: string;
  title: ReactNode;
  /** Supporting paragraph shown beneath or beside the title. */
  intro?: ReactNode;
  /** Right-aligned slot, normally a TextLink to the index page. */
  action?: ReactNode;
  light?: boolean;
  /** 'split' puts the intro in a second column on large screens. */
  layout?: 'stacked' | 'split';
  className?: string;
  as?: 'h2' | 'h3';
};

/**
 * The standard section header. The mono label plus red rule is the site's
 * signature device, borrowed from drawing-sheet title blocks.
 */
export function SectionHeading({
  label,
  title,
  intro,
  action,
  light = false,
  layout = 'stacked',
  className,
  as: Tag = 'h2',
}: Props) {
  const titleSize =
    Tag === 'h2'
      ? 'text-h2'
      : 'text-h3';

  return (
    <Reveal
      className={[
        layout === 'split'
          ? 'grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-end lg:gap-16'
          : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div>
        <span className={['title-block', light ? 'text-white/70' : 'text-ink/60'].join(' ')}>
          {label}
        </span>
        <Tag
          className={[
            'mt-5 max-w-3xl',
            titleSize,
            light ? 'text-white' : 'text-ink',
          ].join(' ')}
        >
          {title}
        </Tag>
      </div>

      {(intro || action) && (
        <div className={layout === 'split' ? '' : 'mt-6 max-w-2xl'}>
          {intro && (
            <div
              className={[
                'text-[1.0625rem] leading-relaxed',
                light ? 'text-ash' : 'text-body',
              ].join(' ')}
            >
              {intro}
            </div>
          )}
          {action && <div className="mt-7">{action}</div>}
        </div>
      )}
    </Reveal>
  );
}
