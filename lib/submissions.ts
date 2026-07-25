import { NextResponse } from 'next/server';
import { validate, type Schema } from './validation';

/**
 * SUBMISSION PIPELINE
 * ===========================================================================
 * Every form on the site funnels through here so validation, rate limiting,
 * logging, and delivery behave identically.
 *
 * Right now a valid submission is logged on the server and acknowledged. The
 * delivery step is isolated in `deliver()` below — that is the single function
 * to change when Resend, HubSpot, Airtable, or a database is added.
 *
 * ⚠️ SECRETS: read API keys from process.env inside this file only. This module
 * is server-only (imported exclusively by route handlers), so nothing here is
 * ever bundled into client JavaScript.
 * ===========================================================================
 */

export type SubmissionType = 'bid' | 'contact' | 'subcontractor' | 'careers';

/* --------------------------------------------------------------------------
   Basic in-memory rate limiting.
   Enough to stop casual form spam on a single instance. For real protection
   across serverless instances, move this to Upstash Redis or Vercel KV, or put
   the routes behind Vercel's WAF / a CAPTCHA.
   -------------------------------------------------------------------------- */

const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, { count: number; resetAt: number }>();

function rateLimit(key: string) {
  const now = Date.now();
  const entry = hits.get(key);

  if (!entry || now > entry.resetAt) {
    hits.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true, retryAfter: 0 };
  }

  entry.count += 1;
  if (entry.count > MAX_PER_WINDOW) {
    return { allowed: false, retryAfter: Math.ceil((entry.resetAt - now) / 1000) };
  }

  return { allowed: true, retryAfter: 0 };
}

/** Best-effort client identity from proxy headers. */
function clientKey(request: Request, type: SubmissionType) {
  const forwarded = request.headers.get('x-forwarded-for') ?? '';
  const ip = forwarded.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'unknown';
  return `${type}:${ip}`;
}

/** Short human-readable reference the visitor can quote on the phone. */
function reference(type: SubmissionType) {
  const prefix = { bid: 'BID', contact: 'MSG', subcontractor: 'SUB', careers: 'JOB' }[type];
  const stamp = new Date().toISOString().slice(2, 10).replace(/-/g, '');
  const random = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `${prefix}-${stamp}-${random}`;
}

/**
 * DELIVERY — replace the body of this function to connect a real destination.
 *
 * Resend example:
 *   const { Resend } = await import('resend');
 *   const resend = new Resend(process.env.RESEND_API_KEY);
 *   await resend.emails.send({
 *     from: 'website@childresspainting.com',
 *     to: process.env.ESTIMATING_INBOX!,
 *     subject: `[${type}] ${data.projectName ?? data.subject ?? data.name}`,
 *     text: Object.entries(data).map(([k, v]) => `${k}: ${v}`).join('\n'),
 *   });
 *
 * HubSpot example:
 *   await fetch(`https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formId}`, {
 *     method: 'POST',
 *     headers: { 'Content-Type': 'application/json' },
 *     body: JSON.stringify({ fields: Object.entries(data).map(([name, value]) => ({ name, value })) }),
 *   });
 *
 * Airtable example:
 *   await fetch(`https://api.airtable.com/v0/${baseId}/${table}`, {
 *     method: 'POST',
 *     headers: {
 *       Authorization: `Bearer ${process.env.AIRTABLE_TOKEN}`,
 *       'Content-Type': 'application/json',
 *     },
 *     body: JSON.stringify({ records: [{ fields: data }] }),
 *   });
 *
 * Throw on failure — the caller converts it into a 502 so the visitor is told
 * to phone or email instead of assuming the message was delivered.
 */
async function deliver(
  type: SubmissionType,
  data: Record<string, string>,
  ref: string,
): Promise<void> {
  // Logged server-side only. Never echoed back to the browser.
  console.info(
    `[childress:${type}] ${ref}`,
    JSON.stringify({ ...data, receivedAt: new Date().toISOString() }),
  );
}

const SUCCESS_MESSAGES: Record<SubmissionType, string> = {
  bid: 'Bid invitation received.',
  contact: 'Message received.',
  subcontractor: 'Application received.',
  careers: 'Application received.',
};

export async function handleSubmission(
  request: Request,
  type: SubmissionType,
  schema: Schema,
) {
  const limit = rateLimit(clientKey(request, type));
  if (!limit.allowed) {
    return NextResponse.json(
      {
        ok: false,
        message: `Too many submissions in a short period. Try again in ${limit.retryAfter} seconds, or call the office.`,
      },
      { status: 429, headers: { 'Retry-After': String(limit.retryAfter) } },
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, message: 'The form could not be read. Refresh the page and try again.' },
      { status: 400 },
    );
  }

  /* Honeypot: a field hidden from people but filled in by naive bots.
     Return a normal success so the bot has no signal to adapt to. */
  const honeypot = (payload as Record<string, unknown>)?.website;
  if (typeof honeypot === 'string' && honeypot.trim() !== '') {
    return NextResponse.json({ ok: true, message: SUCCESS_MESSAGES[type] });
  }

  const result = validate(schema, payload);
  if (!result.success) {
    return NextResponse.json(
      {
        ok: false,
        errors: result.errors,
        message: 'Some fields need attention. Correct the highlighted items and send again.',
      },
      { status: 422 },
    );
  }

  const ref = reference(type);

  try {
    await deliver(type, result.data, ref);
  } catch (error) {
    console.error(`[childress:${type}] delivery failed`, error);
    return NextResponse.json(
      {
        ok: false,
        message:
          'We could not deliver your submission. Please call or email us directly so nothing is missed.',
      },
      { status: 502 },
    );
  }

  return NextResponse.json({
    ok: true,
    message: SUCCESS_MESSAGES[type],
    reference: ref,
  });
}
