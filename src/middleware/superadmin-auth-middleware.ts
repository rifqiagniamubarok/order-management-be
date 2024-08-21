import { Request, Response, NextFunction } from 'express';
import { verify, JwtPayload } from 'jsonwebtoken';
import { toDecodeSuperadminJwtResponse, SuperadminRequest, userSuperadminJwt } from '../type/superadmin-type';
import { ResponseError } from '../error/response-error';

export const superadminAuthMiddleware = async (req: SuperadminRequest, res: Response, next: NextFunction) => {
  try {
    const authorization = req.headers.authorization;

    if (authorization) {
      const token = authorization.split('Bearer ')[1];
      const tokenSecret = process.env.TOKEN_SECRET || 'shhhhh';

      const decodedToken = verify(token, tokenSecret);
      if (!decodedToken) {
        throw new ResponseError(401, 'Unauthorized');
      }
      const result: userSuperadminJwt = toDecodeSuperadminJwtResponse(decodedToken);
      if (result.role !== 'SUPERADMIN') {
        throw new ResponseError(403, 'Forbidden');
      }

      req.admin = result;

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
