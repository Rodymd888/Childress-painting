import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export type Crumb = { name: string; href: string };

/**
 * Breadcrumb trail. Always include Home as the first crumb and the current
 * page as the last — the last item renders as plain text, not a link.
 * Pair with breadcrumbSchema() from lib/schema.ts on the same page.
 */
export function Breadcrumbs({ crumbs, light = true }: { crumbs: Crumb[]; light?: boolean }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol
        className={[
          'flex flex-wrap items-center gap-x-1.5 gap-y-1 font-mono text-[0.625rem] uppercase tracking-[0.16em]',
          light ? 'text-white/60' : 'text-ink/60',
        ].join(' ')}
      >
        {crumbs.map((crumb, i) => {
          const isLast = i === crumbs.length - 1;
          return (
            <li key={crumb.href} className="flex items-center gap-1.5">
              {i > 0 && (
                <ChevronRight aria-hidden="true" className="size-3 shrink-0 opacity-60" />
              )}
              {isLast ? (
                <span aria-current="page" className={light ? 'text-white' : 'text-ink'}>
                  {crumb.name}
                </span>
              ) : (
                <Link
                  href={crumb.href}
                  className={[
                    'inline-block py-1.5 transition-colors',
                    light ? 'hover:text-white' : 'hover:text-red',
                  ].join(' ')}
                >
                  {crumb.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
