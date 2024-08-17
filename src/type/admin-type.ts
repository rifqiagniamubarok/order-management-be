import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export interface userAdminJwt {
  id: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  role: string;
}

export const toDecodeAdminJwtResponse = (user: JwtPayload | any): userAdminJwt => {
  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    phoneNumber: user.phoneNumber,
    email: user.email,
    role: user.role,
  };
};

export interface AdminRequest extends Request {
  admin?: userAdminJwt;
}
