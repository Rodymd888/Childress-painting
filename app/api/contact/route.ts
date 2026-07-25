import { handleSubmission } from '@/lib/submissions';
import { contactSchema } from '@/lib/validation';

/** General enquiries from the contact page. */
export async function POST(request: Request) {
  return handleSubmission(request, 'contact', contactSchema);
}
