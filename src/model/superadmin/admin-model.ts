import { $Enums, Admin, Role } from '@prisma/client';
import { PaginationResponse } from './general-model';

export enum RoleAdmin {
  ADMIN = 'ADMIN',
  SUPERADMIN = 'SUPERADMIN',
}

export interface CreateRequest extends CreateResponse {
  createdBy?: number;
  password: string;
}

export interface CreateResponse {
  id?: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  role: $Enums.Role | RoleAdmin;
  photo?: string | null;
  isActive?: boolean;
}

export interface DetailResponse extends CreateResponse {
  createdBy?: string | null;
  createdAt?: Date | null;
  updatedBy?: string | null;
  updatedAt?: Date | null;
}

export interface DetailRequest extends Admin {
  createdByAdmin?: Admin | null;
  updatedByAdmin?: Admin | null;
}

export interface EditRequest {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  email?: string;
  role?: $Enums.Role | RoleAdmin;
  photo?: string | null;
  isActive?: boolean;
  updatedBy?: number;
  password?: string;
}

export interface GetAllResponse {
  data: CreateResponse[];
  pagination: PaginationResponse;
}

export const toCreateResponse = (user: Admin): CreateResponse => {
  const { id, firstName, lastName, phoneNumber, email, role, photo, isActive } = user;
  return {
    id,
    firstName,
    lastName,
    phoneNumber,
    email,
    role,
    photo,
    isActive,
  };
};

export const toDetailResponse = (user: DetailRequest): DetailResponse => {
  const { id, firstName, lastName, phoneNumber, email, role, photo, isActive, createdByAdmin, updatedByAdmin, createdAt, updatedAt } = user;

  return {
    id,
    firstName,
    lastName,
    phoneNumber,
    email,
    role,
    photo,
    isActive,
    createdBy: createdByAdmin ? `${createdByAdmin.firstName} ${createdByAdmin.lastName}` : null,
    updatedBy: updatedByAdmin ? `${updatedByAdmin.firstName} ${updatedByAdmin.lastName}` : null,
    createdAt,
    updatedAt,
  };
};
