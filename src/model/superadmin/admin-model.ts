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
  id: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  role: $Enums.Role | RoleAdmin;
  photo?: string | null;
  isActive?: boolean;
}

export interface PaginationRequest {
  search?: string;
  page: number;
  pageSize: number;
}

export interface PaginationResponse extends PaginationRequest {
  nextPage: number;
  prevPage: number;
  lastPage: number;
  total: number;
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
