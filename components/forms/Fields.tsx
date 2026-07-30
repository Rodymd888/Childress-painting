'use client';

import { Upload, AlertCircle } from 'lucide-react';
import type { ReactNode } from 'react';

/* --------------------------------------------------------------------------
   Shared styling. Inputs are 48px tall so they clear the 44px touch target
   minimum on phones without feeling oversized on desktop.
   -------------------------------------------------------------------------- */

const controlBase =
  'w-full min-h-12 border bg-white px-4 py-3 text-[0.9375rem] text-ink transition-colors placeholder:text-body/60 focus:border-ink focus:outline-none';

const ok = 'border-line hover:border-ink/35';
const bad = 'border-red bg-red/[0.03]';

function labelClasses() {
  return 'block font-mono text-[0.625rem] font-medium uppercase tracking-[0.16em] text-ink';
}

function FieldWrapper({
  name,
  label,
  required,
  hint,
  error,
  children,
  className,
}: {
  name: string;
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={name} className={labelClasses()}>
        {label}
        {required && (
          <span className="ml-1 text-red" aria-hidden="true">
            *
          </span>
        )}
        {!required && <span className="ml-2 normal-case tracking-normal text-body/60">optional</span>}
      </label>

      {hint && (
        <p id={`${name}-hint`} className="mt-1.5 text-[0.8125rem] leading-snug text-body">
          {hint}
        </p>
      )}

      <div className="mt-2">{children}</div>

      {error && (
        <p
          id={`${name}-error`}
          role="alert"
          className="mt-2 flex items-start gap-1.5 text-[0.8125rem] font-medium text-red-dark"
        >
          <AlertCircle aria-hidden="true" className="mt-0.5 size-3.5 shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}

function describedBy(name: string, hint?: string, error?: string) {
  const ids = [hint && `${name}-hint`, error && `${name}-error`].filter(Boolean);
  return ids.length ? ids.join(' ') : undefined;
}

/* -------------------------------------------------------------------------- */

type BaseProps = {
  name: string;
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  className?: string;
  defaultValue?: string;
};

export function TextField({
  type = 'text',
  placeholder,
  autoComplete,
  ...props
}: BaseProps & {
  type?: 'text' | 'email' | 'tel' | 'date' | 'url' | 'number';
  placeholder?: string;
  autoComplete?: string;
}) {
  return (
    <FieldWrapper {...props}>
      <input
        id={props.name}
        name={props.name}
        type={type}
        required={props.required}
        placeholder={placeholder}
        autoComplete={autoComplete}
        defaultValue={props.defaultValue}
        aria-invalid={props.error ? true : undefined}
        aria-describedby={describedBy(props.name, props.hint, props.error)}
        className={[controlBase, props.error ? bad : ok].join(' ')}
      />
    </FieldWrapper>
  );
}

export function TextareaField({
  rows = 6,
  placeholder,
  ...props
}: BaseProps & { rows?: number; placeholder?: string }) {
  return (
    <FieldWrapper {...props}>
      <textarea
        id={props.name}
        name={props.name}
        rows={rows}
        required={props.required}
        placeholder={placeholder}
        defaultValue={props.defaultValue}
        aria-invalid={props.error ? true : undefined}
        aria-describedby={describedBy(props.name, props.hint, props.error)}
        className={[controlBase, 'resize-y leading-relaxed', props.error ? bad : ok].join(' ')}
      />
    </FieldWrapper>
  );
}

export function SelectField({
  options,
  placeholder = 'Select one',
  ...props
}: BaseProps & { options: readonly string[]; placeholder?: string }) {
  return (
    <FieldWrapper {...props}>
      <select
        id={props.name}
        name={props.name}
        required={props.required}
        defaultValue={props.defaultValue ?? ''}
        aria-invalid={props.error ? true : undefined}
        aria-describedby={describedBy(props.name, props.hint, props.error)}
        className={[controlBase, 'appearance-none pr-10', props.error ? bad : ok].join(' ')}
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%2346536b' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right 1rem center',
        }}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </FieldWrapper>
  );
}

export function RadioGroupField({
  name,
  label,
  options,
  required,
  error,
  hint,
  className,
  defaultValue,
}: BaseProps & { options: readonly string[] }) {
  return (
    <fieldset className={className} aria-describedby={describedBy(name, hint, error)}>
      <legend className={labelClasses()}>
        {label}
        {required && (
          <span className="ml-1 text-red" aria-hidden="true">
            *
          </span>
        )}
      </legend>

      {hint && (
        <p id={`${name}-hint`} className="mt-1.5 text-[0.8125rem] text-body">
          {hint}
        </p>
      )}

      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((option) => (
          <label
            key={option}
            className="flex min-h-11 cursor-pointer items-center gap-2.5 border border-line bg-white px-4 py-2.5 text-[0.9375rem] transition-colors has-checked:border-ink has-checked:bg-ink has-checked:text-white hover:border-ink/40"
          >
            <input
              type="radio"
              name={name}
              value={option}
              required={required}
              defaultChecked={defaultValue === option}
              className="size-4 shrink-0 accent-red"
            />
            {option}
          </label>
        ))}
      </div>

      {error && (
        <p
          id={`${name}-error`}
          role="alert"
          className="mt-2 flex items-start gap-1.5 text-[0.8125rem] font-medium text-red-dark"
        >
          <AlertCircle aria-hidden="true" className="mt-0.5 size-3.5 shrink-0" />
          {error}
        </p>
      )}
    </fieldset>
  );
}

/**
 * FILE UPLOAD PLACEHOLDER
 * -------------------------------------------------------------------------
 * Direct file upload is intentionally not wired up. Accepting binaries needs
 * object storage, virus scanning, and size limits — decisions that belong to
 * whichever CRM or storage provider is chosen.
 *
 * Until then this collects a link to a shared folder (Dropbox, Box, SharePoint,
 * Procore, BuildingConnected) which is how most GCs share plan sets anyway.
 *
 * TO ENABLE REAL UPLOADS: swap the text input for <input type="file">, post the
 * form as multipart/form-data, and stream the file to your storage provider
 * inside the API route. See README for the recommended approach.
 */
export function FileLinkField({
  name,
  label,
  hint,
  error,
  className,
  accept = 'PDF, DWG, ZIP, or a shared folder link',
}: BaseProps & { accept?: string }) {
  return (
    <div className={className}>
      <label htmlFor={name} className={labelClasses()}>
        {label}
        <span className="ml-2 normal-case tracking-normal text-body/60">optional</span>
      </label>

      <div className="mt-2 border border-dashed border-line bg-mist p-4">
        <div className="flex items-start gap-3">
          <Upload aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-red" />
          <div className="min-w-0 flex-1">
            <p className="text-[0.8125rem] leading-snug text-body">
              {hint ?? `Paste a link to the ${accept.toLowerCase()}.`}
            </p>
            <input
              id={name}
              name={name}
              type="url"
              inputMode="url"
              placeholder="https://"
              aria-describedby={describedBy(name, undefined, error)}
              className={[controlBase, 'mt-3', error ? bad : ok].join(' ')}
            />
            <p className="mt-2 font-mono text-[0.5625rem] uppercase tracking-[0.16em] text-body/60">
              Direct file upload pending storage setup — see README
            </p>
          </div>
        </div>
      </div>

      {error && (
        <p
          id={`${name}-error`}
          role="alert"
          className="mt-2 flex items-start gap-1.5 text-[0.8125rem] font-medium text-red-dark"
        >
          <AlertCircle aria-hidden="true" className="mt-0.5 size-3.5 shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}

/** Groups related fields under a numbered heading inside a long form. */
export function FieldGroup({
  step,
  title,
  description,
  children,
}: {
  step: string;
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section className="border-t border-line pt-8 first:border-t-0 first:pt-0">
      <div className="flex items-baseline gap-4">
        <span className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-red">
          {step}
        </span>
        <h2 className="text-xl text-ink md:text-2xl">{title}</h2>
      </div>
      {description && <p className="mt-2.5 max-w-2xl text-[0.9375rem] text-body">{description}</p>}
      <div className="mt-6 grid gap-5 sm:grid-cols-2">{children}</div>
    </section>
  );
}
