'use client';

import { useFormSubmit } from './useFormSubmit';
import { FormShell } from './FormShell';
import { TextField, TextareaField, RadioGroupField, FieldGroup } from './Fields';
import { CONTACT_METHODS } from '@/lib/validation';

export function ContactForm() {
  const { state, onSubmit } = useFormSubmit('/api/contact');
  const err = state.errors;

  return (
    <FormShell
      state={state}
      onSubmit={onSubmit}
      submitLabel="Send message"
      successTitle="Message received."
      successBody="We read every message that comes through here and route it to the right person. If your question is about an active bid or a job in progress, call the office, it will be faster."
      onReset={() => window.location.reload()}
    >
      <FieldGroup step="01" title="Your Details">
        <TextField name="name" label="Name" required autoComplete="name" error={err.name} />
        <TextField
          name="company"
          label="Company"
          autoComplete="organization"
          error={err.company}
        />
        <TextField
          name="email"
          label="Email"
          type="email"
          required
          autoComplete="email"
          error={err.email}
        />
        <TextField name="phone" label="Phone" type="tel" autoComplete="tel" error={err.phone} />
      </FieldGroup>

      <FieldGroup step="02" title="How Can We Help?">
        <TextField
          name="subject"
          label="Subject"
          required
          className="sm:col-span-2"
          placeholder="e.g. Repaint program for a retail portfolio"
          error={err.subject}
        />
        <TextareaField
          name="message"
          label="Message"
          required
          rows={7}
          className="sm:col-span-2"
          error={err.message}
        />
        <RadioGroupField
          name="contactMethod"
          label="Preferred Contact Method"
          options={CONTACT_METHODS}
          className="sm:col-span-2"
          error={err.contactMethod}
        />
      </FieldGroup>
    </FormShell>
  );
}
