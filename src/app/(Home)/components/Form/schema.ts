import { numericString } from '@/lib/utils';
import { z } from 'zod';

export const formSchema = z.object({
  firstName: z.string().min(3).max(50),
  lastName: z.string().min(3).max(50),
  email: z.string().email(),
  age: numericString(z.number().min(0)),
  grade: z.string().min(3),
});

export type Inputs = z.infer<typeof formSchema>;
