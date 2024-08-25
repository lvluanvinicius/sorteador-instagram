import { z } from "zod";

const envSchema = z.object({
  INSTAGRAM_CLIENT_ID: z.string(),
  INSTAGRAM_CLIENT_SECRET: z.string(),
  NEXTAUTH_URL: z.string().url(),
  NEXTAUTH_SECRET: z.string(),
  AUTH_SECRET: z.string(),
});

export const env = envSchema.parse(process.env);
