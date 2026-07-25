'use client';

import { useFormSubmit } from './useFormSubmit';
import { FormShell } from './FormShell';
import {
  TextField,
  TextareaField,
  SelectField,
  RadioGroupField,
  FileLinkField,
  FieldGroup,
} from './Fields';
import { PROJECT_TYPES, PROJECT_SIZES, CONTACT_METHODS } from '@/lib/validation';

export function BidForm() {
  const { state, onSubmit } = useFormSubmit('/api/bid');
  const err = state.errors;

  return (
    <FormShell
      state={state}
      onSubmit={onSubmit}
      submitLabel="Send bid invitation"
      successTitle="Bid invitation received."
      successBody="Estimating will confirm receipt and tell you whether we are bidding, so you are not left waiting on a no-bid. If your due date is tight, call the office and reference the number below."
      onReset={() => window.location.reload()}
    >
      <FieldGroup
        step="01"
        title="Who is inviting the bid"
        description="We reply to this contact directly with a confirmation and a bid/no-bid answer."
      >
        <TextField
          name="name"
          label="Contact name"
          required
          autoComplete="name"
          error={err.name}
        />
        <TextField
          name="company"
          label="Company"
          required
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
        <TextField
          name="phone"
          label="Phone"
          type="tel"
          required
          autoComplete="tel"
          error={err.phone}
        />
      </FieldGroup>

      <FieldGroup
        step="02"
        title="The project"
        description="Enough detail to identify the job and pull the right documents."
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

      <FieldGroup
        step="03"
        title="Dates"
        description="The bid due date drives everything on our side. Give us the real one."
      >
        <TextField
          name="bidDueDate"
          label="Bid due date"
          type="date"
          error={err.bidDueDate}
        />
        <TextField
          name="startDate"
          label="Estimated start date"
          type="date"
          error={err.startDate}
        />
      </FieldGroup>

      <FieldGroup
        step="04"
        title="Scope and documents"
        description="Tell us what is in the paint scope and how to reach the drawings."
      >
        <TextareaField
          name="scope"
          label="Scope description"
          required
          rows={7}
          className="sm:col-span-2"
          placeholder="Areas included, substrates, finish requirements, working hours, occupied-space constraints, and anything unusual about the site."
          hint="Include phasing or after-hours requirements — they change the price and we would rather account for them now."
          error={err.scope}
        />
        <FileLinkField
          name="planLink"
          label="Plans and specifications"
          className="sm:col-span-2"
          hint="Paste a link to the plan room, shared folder, or invitation-to-bid platform (BuildingConnected, Procore, SmartBid, Dropbox, Box, SharePoint)."
          error={err.planLink}
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
    </FormShell>
  );
}
