import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export interface userCustomerJwt {
  id: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
}

export const toDecodeCustomerJwtResponse = (user: JwtPayload | any): userCustomerJwt => {
  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    phoneNumber: user.phoneNumber,
    email: user.email,
  };
};

export interface CustomerRequest extends Request {
  user?: userCustomerJwt;
}
