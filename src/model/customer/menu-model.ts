import { Menu } from '@prisma/client';
import { PaginationResponse } from '../general-model';

export interface MenuResponse {
  id: number;
  name: string;
  price: number;
}
export interface GetMenuResponse {
  pagination: PaginationResponse;
  data: MenuResponse[];
}

export const toMenuResponse = ({ id, name, price }: Menu): MenuResponse => {
  return {
    id,
    name,
    price,
  };
};
