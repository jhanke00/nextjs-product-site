import { z } from 'zod';

export type OrdersSummary = z.infer<typeof OrdersSummarySchema>;

export const OrdersSummarySchema = z.object({
  count: z.number().nonnegative(),
  total: z.number().nonnegative(),
});
