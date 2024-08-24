import { Request, Response, NextFunction } from 'express';
import { verify, JwtPayload } from 'jsonwebtoken';
import { ResponseError } from '../error/response-error';
import { CustomerRequest, toDecodeCustomerJwtResponse } from '../type/customer-type';

export const CustomerAuthMiddleware = async (req: CustomerRequest, res: Response, next: NextFunction) => {
  try {
    const authorization = req.headers.authorization;

    if (authorization) {
      const token = authorization.split('Bearer ')[1];
      const tokenSecret = process.env.TOKEN_SECRET || 'shhhhh';

      const decodedToken = verify(token, tokenSecret);
      const result = toDecodeCustomerJwtResponse(decodedToken);

      req.user = result;

      next();
    } else {
      res.status(401).json({ errors: 'Token not provided' }).end();
    }
  } catch (error) {
    if (error instanceof ResponseError) {
      res.status(error.status).json({
        success: false,
        errors: error.message,
      });
    }
    res.status(401).json({ errors: 'Unauthorized' }).end();
  }
};
