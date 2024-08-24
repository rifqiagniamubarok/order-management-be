import { z, ZodType } from 'zod';

export class MenuManagementValidation {
  static readonly CREATE: ZodType = z.object({
    name: z.string().min(1).max(100),
    price: z.number().min(0).nonnegative(),
    isAvailable: z.boolean().default(true),
  });
  static readonly CREATEOPTION: ZodType = z.object({
    menuId: z.number().min(0).nonnegative(),
    name: z.string().min(1).max(100),
  });
  static readonly EDITOPTION: ZodType = z.object({
    id: z.number().min(0).nonnegative(),
    name: z.string().min(1).max(100),
    isDefault: z.boolean().optional().default(false),
  });
  static readonly CREATEOPTIONITEM: ZodType = z.object({
    menuOptionId: z.number().min(0).nonnegative(),
    name: z.string().min(1).max(100),
    isDefault: z.boolean().optional().default(false),
  });
  static readonly EDITOPTIONITEM: ZodType = z.object({
    id: z.number().min(0).nonnegative(),
    name: z.string().min(1).max(100),
  });
  static readonly GETALL: ZodType = z.object({
    page: z.number().default(1),
    pageSize: z.number().default(10),
    search: z.string().optional(),
  });
}
