import z from 'zod';

export const AuthUserSchema = z.object({
  accessToken: z.string(),
});

export type AuthUser = z.infer<typeof AuthUserSchema>;
