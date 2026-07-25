'use client';

import { useState, type FormEvent } from 'react';

type Status = 'idle' | 'submitting' | 'success' | 'error';

export type SubmitState = {
  status: Status;
  errors: Record<string, string>;
  message: string;
  reference: string | null;
};

/**
 * Posts a form to an API route as JSON, then surfaces the server's field-level
 * validation back onto the inputs.
 *
 * The server validates independently of the browser, so a visitor with
 * JavaScript disabled or a scripted submission still hits the same rules.
 */
export function useFormSubmit(endpoint: string) {
  const [state, setState] = useState<SubmitState>({
    status: 'idle',
    errors: {},
    message: '',
    reference: null,
  });

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;

    setState({ status: 'submitting', errors: {}, message: '', reference: null });

    try {
      const payload = Object.fromEntries(new FormData(form));

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = (await response.json()) as {
        ok?: boolean;
        errors?: Record<string, string>;
        message?: string;
        reference?: string;
      };

      if (!response.ok || !result.ok) {
        setState({
          status: 'error',
          errors: result.errors ?? {},
          message:
            result.message ??
            'Some fields need attention. Correct the highlighted items and send again.',
          reference: null,
        });
        // Put the visitor back at the top of the form where the summary sits.
        form.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }

      form.reset();
      setState({
        status: 'success',
        errors: {},
        message: result.message ?? 'Received.',
        reference: result.reference ?? null,
      });
    } catch {
      setState({
        status: 'error',
        errors: {},
        message:
          'The form could not be sent. Check your connection and try again, or email us directly.',
        reference: null,
      });
    }
  }

  return { state, onSubmit };
}
