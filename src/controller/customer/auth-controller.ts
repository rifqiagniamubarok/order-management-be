import { NextFunction, Request, Response } from 'express';
import { LoginRequest, RegisterRequest } from '../../model/customer/auth-model';
import { AuthService } from '../../service/customer/auth-service';

export class AuthCustomerController {
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const request: RegisterRequest = req.body;
      const response = await AuthService.register(request);
      res.status(201).json({
        success: true,
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }
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
