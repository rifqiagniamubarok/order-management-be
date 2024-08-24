import { Menu, MenuOption, MenuOptionItem } from '@prisma/client';
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

export interface MenuDetailOptionItemResponse {
  id: number;
  name: string;
  isDefault: boolean;
}
export interface MenuDetailOptionResponse {
  id: number;
  name: string;
  optionItem?: MenuDetailOptionItemResponse[] | null;
}

export interface MenuDetailResponse {
  id: number;
  name: string;
  price: number;
  options?: MenuDetailOptionResponse[] | null;
}

interface MenuOptionRequest extends MenuOption {
  optionItem?: MenuOptionItem[] | null;
}

interface MenuRequest extends Menu {
  options?: MenuOptionRequest[];
}

export const toMenuResponse = ({ id, name, price }: Menu): MenuResponse => {
  return {
    id,
    name,
    price,
  };
};

export const toMenuDetailResponse = ({ id, name, price, options }: MenuRequest): MenuDetailResponse => {
  const response: MenuDetailResponse = {
    id,
    name,
    price,
    options: null,
  };

  if (options && options.length > 0) {
    const getOptions = options.map(({ id, name, optionItem }) => {
      const response: MenuDetailOptionResponse = {
        id,
        name,
        optionItem: null,
      };

      if (optionItem && optionItem.length > 0) {
        const getOptionItem = optionItem.map(({ id, name, isDefault }) => {
          const response: MenuDetailOptionItemResponse = {
            id,
            name,
            isDefault,
          };

          return response;
        });

        response.optionItem = getOptionItem;
      }

      return response;
    });

    response.options = getOptions;
  }

  return response;
};
