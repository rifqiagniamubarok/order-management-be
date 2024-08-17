import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export interface userSuperadminJwt {
  id: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  role: string;
}

export const toDecodeSuperadminJwtResponse = (user: JwtPayload | any): userSuperadminJwt => {
  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    phoneNumber: user.phoneNumber,
    email: user.email,
    role: user.role,
  };
};

export interface SuperadminRequest extends Request {
  admin?: userSuperadminJwt;
}
