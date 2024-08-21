import { Admin, Menu } from '@prisma/client';

export interface CreateMenuRequest {
  name: string;
  price: number;
  isAvailable?: boolean;
}

interface AdminRelation {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

export type CreateMenuResponse = {
  id: number;
  name: string;
  price: number;
  isAvailable?: boolean;
  createdAt?: Date | null;
  updatedAt?: Date | null;
  isDelete?: boolean | null;
  createdByAdmin: AdminRelation | null;
  updatedByAdmin: AdminRelation | null;
  deletedByAdmin: AdminRelation | null;
};

export interface MenuRelation extends Menu {
  createdByAdmin?: Admin | null;
  updatedByAdmin?: Admin | null;
  deletedByAdmin?: Admin | null;
}

export const toCreateMenuResponse = (request: MenuRelation): CreateMenuResponse => {
  const response: CreateMenuResponse = {
    id: request.id,
    name: request.name,
    price: request.price,
    isAvailable: request.isAvailable ?? true,
    isDelete: request.isDelete,
    createdAt: request.createdAt,
    updatedAt: request.updatedAt,
    createdByAdmin: null,
    updatedByAdmin: null,
    deletedByAdmin: null,
  };

  if (request.createdByAdmin) {
    const { id, firstName, lastName, email } = request.createdByAdmin;
    response.createdByAdmin = {
      id,
      firstName,
      lastName,
      email,
    };
  }

  if (request.updatedByAdmin) {
    const { id, firstName, lastName, email } = request.updatedByAdmin;
    response.updatedByAdmin = {
      id,
      firstName,
      lastName,
      email,
    };
  }

  if (request.deletedByAdmin) {
    const { id, firstName, lastName, email } = request.deletedByAdmin;
    response.deletedByAdmin = {
      id,
      firstName,
      lastName,
      email,
    };
  }

  return response;
};
