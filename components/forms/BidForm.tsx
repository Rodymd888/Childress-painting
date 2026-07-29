'use client';

import { useState, useRef, type DragEvent } from 'react';
import { Check, ChevronLeft, ChevronRight, Upload, X, FileText } from 'lucide-react';

import { useFormSubmit } from './useFormSubmit';
import { FormShell } from './FormShell';
import { TextField, TextareaField, SelectField, RadioGroupField, FieldGroup } from './Fields';
import {
  PROJECT_TYPES,
  PROJECT_SIZES,
  PROJECT_BUDGETS,
  CONTACT_METHODS,
} from '@/lib/validation';

/**
 * BID REQUEST PORTAL
 * ===========================================================================
 * v2 — the single long form became a four-step wizard. A general contractor
 * sending an invitation at 4:50pm on a bid day should not be looking at
 * fourteen fields at once; they should be looking at four.
 *
 * Design notes:
 * - Every step stays mounted in the DOM (hidden, not unmounted) so one native
 *   submit still carries every field, and autofill behaves normally.
 * - Validity is checked per step, so you cannot advance past an invalid field
 *   but you are never blocked by a field on a later step.
 * - The server still validates everything independently — the wizard is a
 *   usability layer, never a security boundary.
 * - Progress is a real <ol> with aria-current, so assistive tech gets the same
 *   sense of position that sighted users get from the bar.
 * ===========================================================================
 */

const STEPS = [
  { id: 'contact', label: 'Your details', hint: 'Who we reply to' },
  { id: 'project', label: 'Project', hint: 'What and where' },
  { id: 'commercial', label: 'Dates & budget', hint: 'When and how much' },
  { id: 'scope', label: 'Scope & plans', hint: 'What is in the work' },
] as const;

/* Fields owned by each step, used for per-step validity checks. */
const STEP_FIELDS: string[][] = [
  ['name', 'company', 'email', 'phone'],
  ['projectName', 'projectAddress', 'projectType', 'projectSize'],
  ['bidDueDate', 'startDate', 'budget'],
  ['scope', 'contactMethod'],
];

const MAX_FILE_MB = 25;
const ACCEPTED = '.pdf,.dwg,.dxf,.zip,.rvt,.doc,.docx,.xls,.xlsx,.jpg,.png';

export function BidForm() {
  const { state, onSubmit } = useFormSubmit('/api/bid');
  const err = state.errors;

  const [step, setStep] = useState(0);
  const [files, setFiles] = useState<File[]>([]);
  const [dragging, setDragging] = useState(false);
  const [fileError, setFileError] = useState('');
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  /* Ask the browser to validate only the fields belonging to the current step. */
  function stepIsValid(index: number) {
    const form = formRef.current;
    if (!form) return true;

    for (const name of STEP_FIELDS[index]) {
      const field = form.elements.namedItem(name);
      const control = field instanceof RadioNodeList ? field[0] : field;

      if (
        control instanceof HTMLInputElement ||
        control instanceof HTMLSelectElement ||
        control instanceof HTMLTextAreaElement
      ) {
        if (!control.checkValidity()) {
          control.reportValidity();
          return false;
        }
      }
    }
    return true;
  }

  function next() {
    if (!stepIsValid(step)) return;
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function back() {
    setStep((s) => Math.max(s - 1, 0));
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function addFiles(incoming: FileList | null) {
    if (!incoming) return;
    setFileError('');

    const accepted: File[] = [];
    for (const file of Array.from(incoming)) {
      if (file.size > MAX_FILE_MB * 1024 * 1024) {
        setFileError(`${file.name} is larger than ${MAX_FILE_MB} MB. Send a link instead.`);
        continue;
      }
      accepted.push(file);
    }
    setFiles((current) => [...current, ...accepted].slice(0, 10));
  }

  function onDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setDragging(false);
    addFiles(event.dataTransfer.files);
  }

  const isLast = step === STEPS.length - 1;

  return (
    <div>
      {/* Progress ---------------------------------------------------------- */}
      {state.status !== 'success' && (
        <nav aria-label="Bid request progress" className="mb-8">
          <ol className="grid grid-cols-4 gap-2">
            {STEPS.map((item, i) => {
              const done = i < step;
              const current = i === step;

              return (
                <li key={item.id}>
                  <button
                    type="button"
                    /* Completed steps stay reachable; future steps do not. */
                    onClick={() => i < step && setStep(i)}
                    disabled={i > step}
                    aria-current={current ? 'step' : undefined}
                    className="w-full text-left disabled:cursor-default"
                  >
                    <span
                      className={[
                        'block h-1 w-full transition-colors duration-500',
                        done || current ? 'bg-red' : 'bg-line',
                      ].join(' ')}
                    />
                    <span className="mt-3 flex items-center gap-1.5">
                      <span
                        className={[
                          'flex size-4 shrink-0 items-center justify-center rounded-full text-[0.5rem] font-bold transition-colors',
                          done
                            ? 'bg-red text-white'
                            : current
                              ? 'bg-navy text-white'
                              : 'bg-concrete text-navy/60',
                        ].join(' ')}
                      >
                        {done ? <Check aria-hidden="true" className="size-2.5" /> : i + 1}
                      </span>
                      <span
                        className={[
                          'hidden font-mono text-[0.5625rem] uppercase tracking-[0.14em] sm:block',
                          current ? 'text-navy' : 'text-navy/60',
                        ].join(' ')}
                      >
                        {item.label}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>

          <p className="mt-4 font-mono text-[0.625rem] uppercase tracking-[0.16em] text-body">
            Step {step + 1} of {STEPS.length} — {STEPS[step].hint}
          </p>
        </nav>
      )}

      <FormShell
        formRef={formRef}
        state={state}
        onSubmit={onSubmit}
        submitLabel="Send bid invitation"
        successTitle="Bid invitation received."
        successBody="Estimating will confirm receipt and tell you whether we are bidding, so you are not left waiting on a no-bid. If your due date is tight, call the office and quote the reference below."
        onReset={() => window.location.reload()}
        hideSubmit={!isLast}
        footer={
          <div className="flex flex-wrap items-center gap-3">
            {step > 0 && (
              <button
                type="button"
                onClick={back}
                className="inline-flex min-h-12 items-center gap-2 border border-navy/25 px-5 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-navy transition-colors hover:border-navy hover:bg-navy hover:text-white"
              >
                <ChevronLeft aria-hidden="true" className="size-4" />
                Back
              </button>
            )}

            {!isLast && (
              <button
                type="button"
                onClick={next}
                className="group inline-flex min-h-12 items-center gap-2 bg-navy px-6 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-white transition-colors hover:bg-navy-700"
              >
                Continue
                <ChevronRight
                  aria-hidden="true"
                  className="size-4 transition-transform group-hover:translate-x-1"
                />
              </button>
            )}
          </div>
        }
      >
        {/* Step 1 — contact ------------------------------------------------ */}
        <div hidden={step !== 0}>
          <FieldGroup
            step="01"
            title="Who is inviting the bid"
            description="We reply to this contact directly with a confirmation and a bid/no-bid answer."
          >
            <TextField name="name" label="Contact person" required autoComplete="name" error={err.name} />
            <TextField name="company" label="Company name" required autoComplete="organization" error={err.company} />
            <TextField name="email" label="Email" type="email" required autoComplete="email" error={err.email} />
            <TextField name="phone" label="Phone" type="tel" required autoComplete="tel" error={err.phone} />
          </FieldGroup>
        </div>

        {/* Step 2 — project ------------------------------------------------ */}
        <div hidden={step !== 1}>
          <FieldGroup
            step="02"
            title="The project"
            description="Enough detail for us to identify the job and pull the right documents."
          >
            <TextField
              name="projectName"
              label="Project name"
              required
              placeholder="e.g. Westside Medical Plaza — Phase 2"
              error={err.projectName}
            />
            <TextField
              name="projectAddress"
              label="Project address"
              required
              placeholder="Street, city, state"
              error={err.projectAddress}
            />
            <SelectField
              name="projectType"
              label="Project type"
              required
              options={PROJECT_TYPES}
              error={err.projectType}
            />
            <SelectField
              name="projectSize"
              label="Estimated project size"
              options={PROJECT_SIZES}
              hint="Approximate is fine — it tells us how to staff the estimate."
              error={err.projectSize}
            />
          </FieldGroup>
        </div>

        {/* Step 3 — dates and budget --------------------------------------- */}
        <div hidden={step !== 2}>
          <FieldGroup
            step="03"
            title="Dates and budget"
            description="The bid due date drives everything on our side. Give us the real one."
          >
            <TextField name="bidDueDate" label="Bid due date" type="date" error={err.bidDueDate} />
            <TextField name="startDate" label="Estimated start date" type="date" error={err.startDate} />
            <SelectField
              name="budget"
              label="Estimated budget"
              options={PROJECT_BUDGETS}
              className="sm:col-span-2"
              hint="A range is enough. It tells us whether the scope and the budget are in the same conversation — worth knowing before either of us spends a day on it."
              error={err.budget}
            />
          </FieldGroup>
        </div>

        {/* Step 4 — scope and plans ---------------------------------------- */}
        <div hidden={step !== 3}>
          <FieldGroup
            step="04"
            title="Scope and documents"
            description="Tell us what is in the paint scope and attach or link the drawings."
          >
            <TextareaField
              name="scope"
              label="Scope of work"
              required
              rows={7}
              className="sm:col-span-2"
              placeholder="Areas included, substrates, finish requirements, working hours, occupied-space constraints, and anything unusual about the site."
              hint="Include phasing or after-hours requirements — they change the price and we would rather account for them now."
              error={err.scope}
            />

            {/* Plan upload ---------------------------------------------------- */}
            <div className="sm:col-span-2">
              <span className="block font-mono text-[0.625rem] font-medium uppercase tracking-[0.16em] text-navy">
                Upload plans
                <span className="ml-2 normal-case tracking-normal text-body/60">optional</span>
              </span>

              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragging(true);
                }}
                onDragLeave={() => setDragging(false)}
                onDrop={onDrop}
                className={[
                  'mt-2 border-2 border-dashed p-6 text-center transition-colors',
                  dragging ? 'border-red bg-red/[0.04]' : 'border-line bg-white',
                ].join(' ')}
              >
                <Upload aria-hidden="true" className="mx-auto size-5 text-red" />
                <p className="mt-3 text-[0.9375rem] text-navy">
                  Drag drawings here, or{' '}
                  <button
                    type="button"
                    onClick={() => inputRef.current?.click()}
                    className="font-semibold text-red-dark underline underline-offset-2"
                  >
                    browse your files
                  </button>
                </p>
                <p className="mt-1.5 text-[0.8125rem] text-body">
                  PDF, DWG, RVT, ZIP, and images. Up to {MAX_FILE_MB} MB each, 10 files.
                </p>

                <input
                  ref={inputRef}
                  id="plans"
                  name="plans"
                  type="file"
                  multiple
                  accept={ACCEPTED}
                  className="sr-only"
                  onChange={(e) => addFiles(e.target.files)}
                />
              </div>

              {fileError && (
                <p role="alert" className="mt-2 text-[0.8125rem] font-medium text-red-dark">
                  {fileError}
                </p>
              )}

              {files.length > 0 && (
                <ul className="mt-3 space-y-1.5">
                  {files.map((file, i) => (
                    <li
                      key={`${file.name}-${i}`}
                      className="flex items-center gap-3 border border-line bg-white px-4 py-2.5"
                    >
                      <FileText aria-hidden="true" className="size-4 shrink-0 text-navy/60" />
                      <span className="min-w-0 flex-1 truncate text-[0.875rem] text-navy">
                        {file.name}
                      </span>
                      <span className="shrink-0 font-mono text-[0.625rem] text-body">
                        {(file.size / 1024 / 1024).toFixed(1)} MB
                      </span>
                      <button
                        type="button"
                        onClick={() => setFiles((c) => c.filter((_, index) => index !== i))}
                        className="shrink-0 text-navy/60 transition-colors hover:text-red"
                      >
                        <X aria-hidden="true" className="size-4" />
                        <span className="sr-only">Remove {file.name}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}

              <p className="mt-3 border-l-2 border-line pl-3 font-mono text-[0.5625rem] uppercase leading-relaxed tracking-[0.14em] text-body">
                {/* Honest status: the picker is real, the transport is not wired yet. */}
                File transport is not connected yet — see README. Until it is, filenames are sent
                with your enquiry and we request the drawings by reply. The link field below
                reaches us immediately.
              </p>
            </div>

            <TextField
              name="planLink"
              label="Or link to the plan room"
              type="url"
              className="sm:col-span-2"
              placeholder="https://"
              hint="BuildingConnected, Procore, SmartBid, Dropbox, Box, or SharePoint — whatever you already use."
              error={err.planLink}
            />

            <TextareaField
              name="notes"
              label="Additional notes"
              rows={4}
              className="sm:col-span-2"
              placeholder="Anything else we should know — prevailing wage, bonding, prequalification paperwork, site access, or a hard constraint we have not asked about."
              error={err.notes}
            />

            <RadioGroupField
              name="contactMethod"
              label="Preferred contact method"
              required
              options={CONTACT_METHODS}
              className="sm:col-span-2"
              error={err.contactMethod}
            />
          </FieldGroup>
        </div>

        {/* Filenames travel with the submission so estimating knows what is coming. */}
        <input type="hidden" name="attachments" value={files.map((f) => f.name).join(', ')} />
      </FormShell>
    </div>
  );
}
