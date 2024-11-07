import { z } from 'zod';
import { OrderItemSchema } from './OrderItem';

export type Order = z.infer<typeof OrderSchema>;

export const OrderSchema = z.object({
  user: z.string().uuid(),
  items: z.array(OrderItemSchema),
  total: z.number().positive(),
  time: z.string().datetime(),
});
