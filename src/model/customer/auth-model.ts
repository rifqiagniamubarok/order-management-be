import { Customer } from '@prisma/client';

export interface registerRequest {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  password: string;
}

export interface registerResponse {
  firstName: string;
  lastName: string;
  email: string;
}

export const toRegisterResponse = (customer: Customer): registerResponse => {
  return {
    firstName: customer.firstName,
    lastName: customer.lastName,
    email: customer.email,
  };
};
