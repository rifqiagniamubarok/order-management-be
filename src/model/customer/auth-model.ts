import { Customer } from '@prisma/client';

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  firstName: string;
  lastName: string;
  email: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}
export interface LoginResponse {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  token: string;
}

export const toLoginResponse = (user: Customer, token: string): LoginResponse => {
  return {
    firstName: user.firstName,
    lastName: user.lastName,
    phoneNumber: user.phoneNumber,
    email: user.email,
    token,
  };
};

export const toRegisterResponse = (customer: Customer): RegisterResponse => {
  return {
    firstName: customer.firstName,
    lastName: customer.lastName,
    email: customer.email,
  };
};
