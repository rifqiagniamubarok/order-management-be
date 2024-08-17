import { Admin } from '@prisma/client';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  photo: string | null;
  role: string;
  token: string;
}

export const toLoginResponse = (user: Admin, token: string): LoginResponse => {
  return {
    firstName: user.firstName,
    lastName: user.lastName,
    phoneNumber: user.phoneNumber,
    email: user.email,
    photo: user.photo || null,
    role: user.role,
    token,
  };
};
