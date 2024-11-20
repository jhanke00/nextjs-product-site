import { z } from 'zod';

export const productSearchSchema = z.object({
  name: z
    .string()
    .trim()
    .toLowerCase()
    .refine((value) => {
      if (!value?.length) return true;
      return value.length > 5;
    }, 'At least 5 characters are required'),
  category: z.string(),
});

export type ProductSearchSchemaType = z.infer<typeof productSearchSchema>;
