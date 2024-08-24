import { z, ZodType } from 'zod';

export class MenuValidation {
  static readonly GETALL: ZodType = z.object({
    page: z.number().default(1),
    pageSize: z.number().default(10),
    search: z.string().optional(),
  });
}
