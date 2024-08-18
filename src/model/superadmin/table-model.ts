import { Table } from '@prisma/client';

export interface CreateRequest {
  number: number;
  desc?: string | null;
}

export interface CreateResponse extends CreateRequest {
  id: number;
}

export interface EditRequest {
  number?: number;
  desc?: string | null;
}

export const toCreateResponse = (table: Table): CreateResponse => {
  const { id, number, desc } = table;
  return {
    id,
    number,
    desc,
  };
};
