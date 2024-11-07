import { z } from 'zod';

export type OrderItem = z.infer<typeof OrderItemSchema>;

export const OrderItemSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  price: z.string(),
  count: z.number().positive(),
});
