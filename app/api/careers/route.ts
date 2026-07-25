import { handleSubmission } from '@/lib/submissions';
import { careersSchema } from '@/lib/validation';

/** Field and office job applications. */
export async function POST(request: Request) {
  return handleSubmission(request, 'careers', careersSchema);
}
