import { z } from "zod";

/**
 * Contact payload contract. Shared by the client form and the Route Handler so
 * the two cannot drift apart.
 *
 * `company` is the honeypot: hidden from humans and from assistive tech, and it
 * must stay empty. Bots that autofill every field trip it.
 */
export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter at least 2 characters.")
    .max(80, "That name is a little long — 80 characters max."),
  email: z
    .string()
    .trim()
    .min(1, "An email address is required.")
    .max(160, "That email is too long.")
    // Written as an explicit pattern rather than z.string().email(), which is
    // deprecated in Zod 4.
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, "That does not look like a valid email address."),
  message: z
    .string()
    .trim()
    .min(20, "Tell me a bit more — at least 20 characters.")
    .max(4000, "Messages are capped at 4000 characters."),
  /**
   * Honeypot. Intentionally unconstrained here: a filled honeypot has to look
   * like a normal successful submission, so the Route Handler checks this
   * *after* parsing and returns 200 without sending anything. Rejecting it in
   * the schema would answer 400 and tell the bot exactly which field tripped.
   */
  company: z.string().optional().default(""),
});

export type ContactInput = z.infer<typeof contactSchema>;

/** Turns a ZodError into `{ field: message }` for inline display. */
export function flattenIssues(error: z.ZodError): Record<string, string> {
  const output: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = issue.path[0];
    if (typeof key === "string" && !(key in output)) {
      output[key] = issue.message;
    }
  }
  return output;
}
