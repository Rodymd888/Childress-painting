'use client';

import { useFormSubmit } from './useFormSubmit';
import { FormShell } from './FormShell';
import {
  TextField,
  TextareaField,
  SelectField,
  FileLinkField,
  FieldGroup,
} from './Fields';
import { CAREER_ROLES, EXPERIENCE_LEVELS } from '@/lib/validation';

export function CareersForm() {
  const { state, onSubmit } = useFormSubmit('/api/careers');
  const err = state.errors;

  return (
    <FormShell
      state={state}
      onSubmit={onSubmit}
      submitLabel="Send application"
      successTitle="Application received."
      successBody="We keep applications on file and review them as crews are built for upcoming work. If your experience matches an opening, we will reach out to arrange a conversation."
      onReset={() => window.location.reload()}
    >
      <FieldGroup step="01" title="About You">
        <TextField name="name" label="Name" required autoComplete="name" error={err.name} />
        <TextField
          name="email"
          label="Email"
          type="email"
          required
          autoComplete="email"
          error={err.email}
        />
        <TextField
          name="phone"
          label="Phone"
          type="tel"
          required
          autoComplete="tel"
          error={err.phone}
        />
        <TextField
          name="location"
          label="Where You Are Based"
          required
          placeholder="City, state"
          error={err.location}
        />
      </FieldGroup>

      <FieldGroup step="02" title="The Work">
        <SelectField
          name="role"
          label="Role You Are Applying For"
          required
          options={CAREER_ROLES}
          error={err.role}
        />
        <SelectField
          name="experience"
          label="Years of Experience"
          required
          options={EXPERIENCE_LEVELS}
          error={err.experience}
        />
        <TextareaField
          name="message"
          label="Tell Us About Your Experience"
          required
          rows={7}
          className="sm:col-span-2"
          placeholder="The kinds of projects you have worked on, the systems and equipment you are comfortable with, certifications you hold, and whether you have your own transportation and tools."
          error={err.message}
        />
        <FileLinkField
          name="resumeLink"
          label="Resume"
          className="sm:col-span-2"
          hint="Paste a link to your resume if you have one. A resume is not required for field roles, the description above is enough."
          error={err.resumeLink}
        />
      </FieldGroup>
    </FormShell>
  );
}
