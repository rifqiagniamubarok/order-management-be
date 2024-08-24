import { prismaClient } from '../../application/database';
import { GetMenuResponse, toMenuResponse } from '../../model/customer/menu-model';
import { PaginationRequest, PaginationResponse } from '../../model/general-model';
import { Validation } from '../../validation/validation';

interface WhereCondition {
  isAvailable: boolean;
  isDelete: boolean;
  name?: object;
}

export class MenuService {
  static async register(request: PaginationRequest): Promise<GetMenuResponse> {
    const paginationRequest = Validation.validate(Validation.PAGINATION, request);

    const { page, pageSize, search } = paginationRequest;

    let whereCondition: WhereCondition = {
      isAvailable: true,
      isDelete: false,
    };

    if (search && search.trim() !== '') {
      whereCondition = {
        ...whereCondition,
        name: { contains: search, mode: 'insensitive' },
      };
    }

    const total = await prismaClient.menu.count({
      where: whereCondition,
    });

    const menus = await prismaClient.menu.findMany({
      where: whereCondition,
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    const lastPage = Math.ceil(total / pageSize);
    const nextPage = page < lastPage ? page + 1 : page;
    const prevPage = page > 1 ? page - 1 : page;

    const pagination: PaginationResponse = {
      page,
      pageSize,
      lastPage,
      nextPage,
      prevPage,
      total,
    };

    const data = menus.map((menu) => toMenuResponse(menu));

    return { data, pagination };
  }
}
