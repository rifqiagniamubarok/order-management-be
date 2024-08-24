import { MenuOption, MenuOptionItem } from '@prisma/client';
import { prismaClient } from '../../application/database';
import { ResponseError } from '../../error/response-error';
import { PaginationRequest, PaginationResponse } from '../../model/general-model';

import {
  CreateMenuOptionItemRequest,
  CreateMenuOptionRequest,
  CreateMenuRequest,
  CreateMenuResponse,
  DetailMenuResponse,
  EditMenuOptionItemRequest,
  EditMenuOptionRequest,
  GetAllMenuResponse,
  toCreateMenuResponse,
  toDetailMenuResponse,
} from '../../model/superadmin/menu-model';
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
  static async createOption(request: CreateMenuOptionRequest): Promise<MenuOption> {
    const createRequest = Validation.validate(MenuManagementValidation.CREATEOPTION, request);

    const isMenuExist = await prismaClient.menu.findUnique({
      where: {
        id: createRequest.menuId,
      },
    });

    if (!isMenuExist) {
      throw new ResponseError(404, 'Menu not found');
    }

    const menu = await prismaClient.menuOption.create({
      data: createRequest,
    });

    return menu;
  }
  static async editOption(request: EditMenuOptionRequest, id: number): Promise<MenuOption> {
    const editRequest = Validation.validate(MenuManagementValidation.EDITOPTION, request);

    const isOptionExist = await prismaClient.menuOption.findUnique({
      where: {
        id,
      },
    });

    if (!isOptionExist) {
      throw new ResponseError(404, 'Menu option not found');
    }

    const menu = await prismaClient.menuOption.update({ where: { id }, data: editRequest });

    return menu;
  }
  static async createOptionItem(request: CreateMenuOptionItemRequest): Promise<MenuOptionItem> {
    const createRequest = Validation.validate(MenuManagementValidation.CREATEOPTIONITEM, request);

    const isOptionExist = await prismaClient.menuOption.findUnique({
      where: { id: createRequest.menuOptionId },
    });

    if (!isOptionExist) {
      throw new ResponseError(404, 'Menu option not found');
    }

    const optionItem = await prismaClient.menuOptionItem.create({
      data: createRequest,
    });

    return optionItem;
  }
  static async editOptionItem(request: EditMenuOptionItemRequest, id: number): Promise<MenuOptionItem> {
    const editRequest = Validation.validate(MenuManagementValidation.EDITOPTIONITEM, request);

    const isOptionItemExist = await prismaClient.menuOptionItem.findUnique({
      where: { id },
    });

    if (!isOptionItemExist) {
      throw new ResponseError(404, 'Menu option item not found');
    }

    const optionItem = await prismaClient.menuOptionItem.update({
      where: { id },
      data: editRequest,
    });

    return optionItem;
  }
}
