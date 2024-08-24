import { NextFunction, Request, Response } from 'express';
import { registerRequest } from '../../model/customer/auth-model';
import { AuthService } from '../../service/customer/auth-service';

export class AuthCustomerController {
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const request: registerRequest = req.body;
      const response = await AuthService.register(request);
      res.status(201).json({
        success: true,
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }
}
