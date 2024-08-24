import { z, ZodType } from 'zod';

export class Validation {
  static validate<T>(schema: ZodType, data: T) {
    return schema.parse(data);
  }
  static readonly PAGINATION: ZodType = z.object({
    page: z.number().default(1),
    pageSize: z.number().default(10),
    search: z.string().optional(),
  });
}
