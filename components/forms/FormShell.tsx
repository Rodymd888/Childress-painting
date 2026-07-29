'use client';

import { CheckCircle2, AlertTriangle, Loader2 } from 'lucide-react';
import type { FormEvent, ReactNode, RefObject } from 'react';
import type { SubmitState } from './useFormSubmit';
import { Button } from '@/components/ui/Button';
import { company } from '@/lib/site';

/**
 * Wraps every form on the site so the submitting, error, and success states
 * look and behave the same everywhere.
 */
export function FormShell({
  state,
  onSubmit,
  children,
  submitLabel,
  successTitle,
  successBody,
  resetLabel = 'Send another',
  onReset,
  formRef,
  /** Hide the submit button — used by multi-step forms that supply their own. */
  hideSubmit = false,
  /** Extra controls rendered beside the submit button (wizard navigation). */
  footer,
}: {
  state: SubmitState;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  children: ReactNode;
  submitLabel: string;
  successTitle: string;
  successBody: string;
  resetLabel?: string;
  onReset?: () => void;
  formRef?: RefObject<HTMLFormElement | null>;
  hideSubmit?: boolean;
  footer?: ReactNode;
}) {
  if (state.status === 'success') {
    return (
      <div className="border-t-4 border-red bg-mist p-8 md:p-12">
        <CheckCircle2 aria-hidden="true" className="size-9 text-red" />
        <h2 className="mt-6 text-[clamp(1.75rem,3.5vw,2.5rem)] text-navy">{successTitle}</h2>
        <p className="mt-4 max-w-xl text-[1.0625rem] leading-relaxed text-body">{successBody}</p>

        {state.reference && (
          <p className="mt-6 inline-block border border-line bg-white px-4 py-3 font-mono text-xs uppercase tracking-[0.16em] text-navy">
            Reference {state.reference}
          </p>
        )}

        <div className="mt-8 flex flex-wrap items-center gap-4">
          {onReset && (
            <Button type="button" variant="dark" onClick={onReset}>
              {resetLabel}
            </Button>
          )}
          <a
            href={`tel:${company.phoneHref}`}
            className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-navy underline decoration-red decoration-2 underline-offset-4"
          >
            Or call {company.phone}
          </a>
        </div>
      </div>
    );
  }

  const submitting = state.status === 'submitting';

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      className="border-t-4 border-red bg-mist p-6 md:p-9 lg:p-12"
    >
      {/* Live region so assistive tech announces the failure without a jump. */}
      <div aria-live="polite">
        {state.status === 'error' && (
          <div
            role="alert"
            className="mb-8 flex items-start gap-3 border border-red bg-red/[0.05] p-4"
          >
            <AlertTriangle aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-red-dark" />
            <div>
              <p className="text-[0.9375rem] font-semibold text-navy">{state.message}</p>
              {Object.keys(state.errors).length > 0 && (
                <ul className="mt-2 space-y-1 text-[0.8125rem] text-body">
                  {Object.entries(state.errors).map(([field, error]) => (
                    <li key={field}>{error}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="space-y-10">{children}</div>

      <div className="mt-10 border-t border-line pt-8">
        <div className="flex flex-wrap items-center gap-3">
          {footer}
          {!hideSubmit && (
            <Button type="submit" size="lg" disabled={submitting}>
              {submitting && <Loader2 aria-hidden="true" className="size-4 animate-spin" />}
              {submitting ? 'Sending…' : submitLabel}
            </Button>
          )}
        </div>
        <p className="mt-4 max-w-xl text-[0.8125rem] leading-relaxed text-body">
          Fields marked with an asterisk are required. We use what you send to respond to your
          enquiry — see our{' '}
          <a href="/privacy" className="text-red-dark underline underline-offset-2">
            privacy notice
          </a>
          .
        </p>
      </div>
    </form>
  );
}
