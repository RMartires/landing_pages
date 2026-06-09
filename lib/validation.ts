import { z } from "zod";

export const waitlistSignupSchema = z.object({
  email: z.string().trim().email("Please enter a valid email address"),
  page_slug: z.string().trim().min(1).max(100),
  utm_source: z.string().trim().max(200).optional().nullable(),
  utm_medium: z.string().trim().max(200).optional().nullable(),
  utm_campaign: z.string().trim().max(200).optional().nullable(),
  utm_content: z.string().trim().max(200).optional().nullable(),
  utm_term: z.string().trim().max(200).optional().nullable(),
  referrer: z.string().trim().max(2000).optional().nullable(),
  landing_path: z.string().trim().max(2000).optional().nullable(),
  user_agent: z.string().trim().max(1000).optional().nullable(),
  website: z.string().max(0).optional().nullable(),
});

export type WaitlistSignupInput = z.infer<typeof waitlistSignupSchema>;

export const dashboardLoginSchema = z.object({
  password: z.string().min(1),
});
