import { handleSubmission } from '@/lib/submissions';
import { bidSchema } from '@/lib/validation';

/** Bid invitations from general contractors, developers, and owners. */
export async function POST(request: Request) {
  return handleSubmission(request, 'bid', bidSchema);
}
