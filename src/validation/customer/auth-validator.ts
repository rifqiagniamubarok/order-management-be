import { z, ZodType } from 'zod';

export class AuthValidation {
  static readonly LOGIN: ZodType = z.object({
    email: z.string().email().min(3).max(100),
    password: z.string().min(3).max(100),
  });
  static readonly REGISTER: ZodType = z.object({
    firstName: z.string().min(3).max(100),
    lastName: z.string().min(3).max(100),
    phoneNumber: z.string().min(3),
    email: z.string().email().min(3).max(100),
    password: z.string().min(3).max(100),
  });
}
