import { prismaClient } from '../../application/database';
import { ResponseError } from '../../error/response-error';
import { PaginationRequest, PaginationResponse } from '../../model/general-model';

import { CreateMenuRequest, CreateMenuResponse, DetailMenuResponse, GetAllMenuResponse, toCreateMenuResponse, toDetailMenuResponse } from '../../model/superadmin/menu-model';
import { MenuManagementValidation } from '../../validation/superadmin/menu-validation';
import { Validation } from '../../validation/validation';

export class MenuManagementService {
  static async create(request: CreateMenuRequest, adminId: number): Promise<CreateMenuResponse> {
    const createRequest = Validation.validate(MenuManagementValidation.CREATE, request);

    createRequest.createdBy = adminId;
    const menu = await prismaClient.menu.create({
      data: createRequest,
      include: { createdByAdmin: true },
    });

    return toCreateMenuResponse(menu);
  }
  static async getDetail(id: number): Promise<DetailMenuResponse> {
    const menu = await prismaClient.menu.findUnique({
      where: { id },
      include: { options: true, createdByAdmin: true, updatedByAdmin: true, deleteByAdmin: true },
    });

    if (!menu) {
      throw new ResponseError(404, 'Menu not found');
    }

    return toDetailMenuResponse(menu);
  }
  static async getAll(request: PaginationRequest): Promise<GetAllMenuResponse> {
    const paginationRequest = Validation.validate(MenuManagementValidation.GETALL, request);

    const { page, pageSize, search } = paginationRequest;

    let whereCondition = {};

    if (search && search.trim() !== '') {
      whereCondition = {
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

    const data = menus.map((menu) => toCreateMenuResponse(menu));

    return { data, pagination };
  }
}
