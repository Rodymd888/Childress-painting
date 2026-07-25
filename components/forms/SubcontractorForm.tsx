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
import { CREW_SIZES, INSURANCE_STATUSES } from '@/lib/validation';

export function SubcontractorForm() {
  const { state, onSubmit } = useFormSubmit('/api/subcontractor');
  const err = state.errors;

  return (
    <FormShell
      state={state}
      onSubmit={onSubmit}
      submitLabel="Submit for prequalification"
      successTitle="Application received."
      successBody="We review subcontractor submissions as capacity requires. If your trades and coverage area fit an upcoming need, someone from our team will follow up to complete prequalification."
      onReset={() => window.location.reload()}
    >
      <FieldGroup
        step="01"
        title="Company"
        description="Use the legal entity name that appears on your insurance certificate and W-9."
      >
        <TextField
          name="companyName"
          label="Company name"
          required
          autoComplete="organization"
          error={err.companyName}
        />
        <TextField
          name="yearsInBusiness"
          label="Years in business"
          required
          placeholder="e.g. 12"
          error={err.yearsInBusiness}
        />
        <TextField name="name" label="Contact name" required autoComplete="name" error={err.name} />
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
        <SelectField
          name="crewSize"
          label="Crew size"
          required
          options={CREW_SIZES}
          hint="Number of field personnel you can put on a job."
          error={err.crewSize}
        />
      </FieldGroup>

      <FieldGroup
        step="02"
        title="Capability"
        description="What you self-perform and where you can reliably work."
      >
        <TextField
          name="serviceAreas"
          label="Service areas"
          required
          className="sm:col-span-2"
          placeholder="e.g. Dallas–Fort Worth, Waco, Tyler — will travel statewide"
          error={err.serviceAreas}
        />
        <TextareaField
          name="trades"
          label="Trades and specialties"
          required
          rows={4}
          className="sm:col-span-2"
          placeholder="e.g. interior/exterior painting, drywall finishing, epoxy floors, abrasive blasting, wallcovering, high-work with boom lifts"
          error={err.trades}
        />
        <TextareaField
          name="experience"
          label="Relevant project experience"
          required
          rows={6}
          className="sm:col-span-2"
          placeholder="Project types, sectors, typical contract size, and the general contractors you have worked under."
          error={err.experience}
        />
      </FieldGroup>

      <FieldGroup
        step="03"
        title="Compliance"
        description="We cannot issue a purchase order without a current certificate of insurance and a completed W-9."
      >
        <SelectField
          name="insurance"
          label="Insurance status"
          required
          options={INSURANCE_STATUSES}
          className="sm:col-span-2"
          error={err.insurance}
        />
        <FileLinkField
          name="w9Link"
          label="W-9"
          hint="Paste a link to your completed W-9, or leave blank and we will request it."
          error={err.w9Link}
        />
        <FileLinkField
          name="coiLink"
          label="Certificate of insurance"
          hint="Paste a link to a current COI showing general liability and workers' compensation."
          error={err.coiLink}
        />
      </FieldGroup>
    </FormShell>
  );
}
