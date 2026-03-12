import { postForm } from "@/lib";

/**
 * Submit passenger feedback (public). Accepts multipart/form-data.
 */
export function submitFeedback(data: FormData): Promise<{ message: string }> {
  return postForm("feedback", data);
}
