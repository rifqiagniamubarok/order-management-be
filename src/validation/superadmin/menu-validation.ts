import { z, ZodType } from 'zod';

export class MenuManagementValidation {
  static readonly CREATE: ZodType = z.object({
    name: z.string().min(1).max(100),
    price: z.number().min(0),
    isAvailable: z.boolean().default(true),
  });
}
