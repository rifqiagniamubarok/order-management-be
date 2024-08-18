import { z, ZodType } from 'zod';

export class TableManagementValidation {
  static readonly CREATE: ZodType = z.object({
    number: z.number().min(1).max(5),
    desc: z.string().optional(),
  });
  static readonly EDIT: ZodType = z.object({
    number: z.number().min(1).max(5).optional(),
    desc: z.string().optional(),
  });
}
