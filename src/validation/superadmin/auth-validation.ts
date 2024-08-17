import { z, ZodType } from 'zod';

export class AuthValidation {
  static readonly LOGIN: ZodType = z.object({
    email: z.string().email().min(3).max(100),
    password: z.string().min(3).max(100),
  });
}
