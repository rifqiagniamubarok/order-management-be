import { z, ZodType } from 'zod';

export class MenuValidation {
  static readonly GETALL: ZodType = z.object({
    page: z.number().default(1),
    pageSize: z.number().default(10),
    search: z.string().optional(),
  });
  static readonly MENUTOBASKET: ZodType = z.object({
    manuId: z.number(),
    qty: z.number(),
    basketItemOptions: z
      .object({
        optionId: z.number(),
        optionItemId: z.number(),
      })
      .optional(),
    tableId: z.number(),
  });
}
