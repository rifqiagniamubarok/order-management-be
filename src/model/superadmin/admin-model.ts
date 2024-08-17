import { $Enums, Admin, Role } from '@prisma/client';

export enum RoleAdmin {
  ADMIN = 'ADMIN',
  SUPERADMIN = 'SUPERADMIN',
}

export interface CreateRequest extends CreateResponse {
  createdBy?: number;
  password: string;
}

export interface CreateResponse {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  role: $Enums.Role | RoleAdmin;
  isActive?: boolean;
}

export const toCreateResponse = (user: Admin): CreateResponse => {
  const { firstName, lastName, phoneNumber, email, role, isActive } = user;
  return {
    firstName,
    lastName,
    phoneNumber,
    email,
    role,
    isActive,
  };
};
