import { z, ZodType } from 'zod';

export class AdminManagementValidation {
  static readonly CREATE: ZodType = z.object({
    firstName: z.string().min(3).max(100),
    lastName: z.string().min(3).max(100),
    phoneNumber: z.string().min(3).max(100),
    email: z.string().email().min(3).max(100),
    password: z.string().min(3).max(100),
    isActive: z.boolean().default(true).optional(),
    role: z.enum(['SUPERADMIN', 'ADMIN']),
  });
}
