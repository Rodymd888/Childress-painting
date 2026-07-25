import { handleSubmission } from '@/lib/submissions';
import { subcontractorSchema } from '@/lib/validation';

/** Subcontractor and supplier prequalification submissions. */
export async function POST(request: Request) {
  return handleSubmission(request, 'subcontractor', subcontractorSchema);
}
