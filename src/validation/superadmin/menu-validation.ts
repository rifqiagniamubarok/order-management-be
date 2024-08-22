import { z, ZodType } from 'zod';

export class MenuManagementValidation {
  static readonly CREATE: ZodType = z.object({
    name: z.string().min(1).max(100),
    price: z.number().min(0).nonnegative(),
    isAvailable: z.boolean().default(true),
  });
  static readonly GETALL: ZodType = z.object({
    page: z.number().default(1),
    pageSize: z.number().default(10),
    search: z.string().optional(),
  });
}
