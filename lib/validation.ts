/**
 * FORM VALIDATION
 * ---------------------------------------------------------------------------
 * A small, dependency-free validator shared by the API routes. Runs on the
 * server so it cannot be bypassed by disabling JavaScript in the browser.
 *
 * If the project later adopts a schema library, replace `validate()` and keep
 * the field definitions — the route handlers do not need to change.
 */

export type FieldRule = {
  label: string;
  required?: boolean;
  type?: 'text' | 'email' | 'phone' | 'date' | 'url';
  minLength?: number;
  maxLength?: number;
  /** Restrict to a fixed set of values (select and radio inputs). */
  oneOf?: readonly string[];
};

export type Schema = Record<string, FieldRule>;

export type ValidationResult<T> =
  | { success: true; data: T }
  | { success: false; errors: Record<string, string> };

const EMAIL = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;
/** Accepts common US formats: digits, spaces, dashes, dots, parens, +1. */
const PHONE = /^[+]?[\d\s().-]{7,20}$/;
const DATE = /^\d{4}-\d{2}-\d{2}$/;

/** Strip control characters and trim. Guards against header injection later. */
function clean(value: unknown): string {
  if (typeof value !== 'string') return '';
  // eslint-disable-next-line no-control-regex
  return value.replace(/[\u0000-\u001F\u007F]/g, ' ').trim();
}

export function validate<T extends Record<string, string>>(
  schema: Schema,
  payload: unknown,
): ValidationResult<T> {
  const errors: Record<string, string> = {};
  const data: Record<string, string> = {};

  if (typeof payload !== 'object' || payload === null) {
    return { success: false, errors: { _form: 'Send the form as a JSON object.' } };
  }

  const input = payload as Record<string, unknown>;

  for (const [name, rule] of Object.entries(schema)) {
    const value = clean(input[name]);
    data[name] = value;

    if (!value) {
      if (rule.required) errors[name] = `${rule.label} is required.`;
      continue;
    }

    const max = rule.maxLength ?? 5000;
    if (value.length > max) {
      errors[name] = `${rule.label} must be ${max} characters or fewer.`;
      continue;
    }

    if (rule.minLength && value.length < rule.minLength) {
      errors[name] = `${rule.label} must be at least ${rule.minLength} characters.`;
      continue;
    }

    if (rule.type === 'email' && !EMAIL.test(value)) {
      errors[name] = 'Enter a valid email address.';
      continue;
    }

    if (rule.type === 'phone' && !PHONE.test(value)) {
      errors[name] = 'Enter a valid phone number.';
      continue;
    }

    if (rule.type === 'date' && !DATE.test(value)) {
      errors[name] = 'Enter a valid date.';
      continue;
    }

    if (rule.oneOf && !rule.oneOf.includes(value)) {
      errors[name] = `Choose one of the listed options for ${rule.label.toLowerCase()}.`;
    }
  }

  if (Object.keys(errors).length) return { success: false, errors };
  return { success: true, data: data as T };
}

/* --------------------------------------------------------------------------
   Shared option lists — imported by the forms so the UI and the server agree.
   -------------------------------------------------------------------------- */

export const PROJECT_TYPES = [
  'New construction',
  'Tenant improvement',
  'Renovation',
  'Repaint / maintenance program',
  'Industrial coatings',
  'Other',
] as const;

export const PROJECT_SIZES = [
  'Under 10,000 sq ft',
  '10,000 – 50,000 sq ft',
  '50,000 – 200,000 sq ft',
  'Over 200,000 sq ft',
  'Not yet defined',
] as const;

export const PROJECT_BUDGETS = [
  'Under $25,000',
  '$25,000 – $100,000',
  '$100,000 – $500,000',
  '$500,000 – $1M',
  'Over $1M',
  'Not yet established',
] as const;

export const CONTACT_METHODS = ['Email', 'Phone', 'Either'] as const;

export const INSURANCE_STATUSES = [
  'Current general liability and workers’ comp',
  'General liability only',
  'Coverage in progress',
  'Not currently insured',
] as const;

export const CREW_SIZES = ['1 – 5', '6 – 15', '16 – 30', '31 – 60', '60+'] as const;

export const CAREER_ROLES = [
  'Commercial painter',
  'Industrial coatings applicator',
  'Foreman / lead',
  'Project manager',
  'Estimator',
  'Superintendent',
  'Administrative',
  'Other',
] as const;

export const EXPERIENCE_LEVELS = [
  'Less than 1 year',
  '1 – 3 years',
  '3 – 7 years',
  '7 – 15 years',
  '15+ years',
] as const;

/* --------------------------------------------------------------------------
   Schemas
   -------------------------------------------------------------------------- */

export const bidSchema: Schema = {
  name: { label: 'Contact name', required: true, maxLength: 120 },
  company: { label: 'Company', required: true, maxLength: 160 },
  email: { label: 'Email', required: true, type: 'email', maxLength: 160 },
  phone: { label: 'Phone', required: true, type: 'phone' },
  projectName: { label: 'Project name', required: true, maxLength: 200 },
  projectAddress: { label: 'Project address', required: true, maxLength: 240 },
  projectType: { label: 'Project type', required: true, oneOf: PROJECT_TYPES },
  startDate: { label: 'Estimated start date', type: 'date' },
  bidDueDate: { label: 'Bid due date', type: 'date' },
  projectSize: { label: 'Estimated project size', oneOf: PROJECT_SIZES },
  budget: { label: 'Estimated budget', oneOf: PROJECT_BUDGETS },
  planLink: { label: 'Plan link', maxLength: 500 },
  attachments: { label: 'Attached filenames', maxLength: 2000 },
  notes: { label: 'Additional notes', maxLength: 5000 },
  contactMethod: { label: 'Preferred contact method', required: true, oneOf: CONTACT_METHODS },
  scope: { label: 'Scope description', required: true, minLength: 20, maxLength: 5000 },
};

export const contactSchema: Schema = {
  name: { label: 'Name', required: true, maxLength: 120 },
  company: { label: 'Company', maxLength: 160 },
  email: { label: 'Email', required: true, type: 'email', maxLength: 160 },
  phone: { label: 'Phone', type: 'phone' },
  subject: { label: 'Subject', required: true, maxLength: 200 },
  contactMethod: { label: 'Preferred contact method', oneOf: CONTACT_METHODS },
  message: { label: 'Message', required: true, minLength: 10, maxLength: 5000 },
};

export const subcontractorSchema: Schema = {
  companyName: { label: 'Company name', required: true, maxLength: 160 },
  name: { label: 'Contact name', required: true, maxLength: 120 },
  email: { label: 'Email', required: true, type: 'email', maxLength: 160 },
  phone: { label: 'Phone', required: true, type: 'phone' },
  serviceAreas: { label: 'Service areas', required: true, maxLength: 300 },
  crewSize: { label: 'Crew size', required: true, oneOf: CREW_SIZES },
  trades: { label: 'Trades and specialties', required: true, maxLength: 500 },
  yearsInBusiness: { label: 'Years in business', required: true, maxLength: 20 },
  insurance: { label: 'Insurance status', required: true, oneOf: INSURANCE_STATUSES },
  w9Link: { label: 'W-9 link', maxLength: 500 },
  coiLink: { label: 'Certificate of insurance link', maxLength: 500 },
  experience: {
    label: 'Relevant project experience',
    required: true,
    minLength: 20,
    maxLength: 5000,
  },
};

export const careersSchema: Schema = {
  name: { label: 'Name', required: true, maxLength: 120 },
  email: { label: 'Email', required: true, type: 'email', maxLength: 160 },
  phone: { label: 'Phone', required: true, type: 'phone' },
  role: { label: 'Role', required: true, oneOf: CAREER_ROLES },
  experience: { label: 'Experience', required: true, oneOf: EXPERIENCE_LEVELS },
  location: { label: 'Location', required: true, maxLength: 160 },
  resumeLink: { label: 'Resume link', maxLength: 500 },
  message: { label: 'About your experience', required: true, minLength: 20, maxLength: 5000 },
};
