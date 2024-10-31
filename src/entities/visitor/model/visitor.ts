import z from 'zod';

export const VisitorSchema = z.object({
  accessToken: z.string().optional(),
});

export type Visitor = z.infer<typeof VisitorSchema>;
