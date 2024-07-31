import { z, ZodTypeAny } from 'zod';

export const numericString = (schema: ZodTypeAny) =>
  z.preprocess(a => {
    if (typeof a === 'string') {
      return parseFloat(a);
    }
    if (typeof a === 'number') {
      return a;
    }
    return undefined;
  }, schema);
