import { NextFunction, Request, Response } from 'express';
import { LoginRequest } from '../../model/superadmin/auth-model';
import { AuthService } from '../../service/superadmin/auth-service';

export class AuthController {
  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const request: LoginRequest = req.body;
      const response = await AuthService.login(request);
      res.status(200).json({
        success: true,
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }
}
