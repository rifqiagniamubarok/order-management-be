import { prismaClient } from '../../application/database';
import { ResponseError } from '../../error/response-error';
import { GetMenuResponse, MenuBasketItemOptionRequest, MenuBasketItemRequest, MenuDetailResponse, toMenuDetailResponse, toMenuResponse } from '../../model/customer/menu-model';
import { PaginationRequest, PaginationResponse } from '../../model/general-model';
import { MenuValidation } from '../../validation/customer/menu-validation';
import { Validation } from '../../validation/validation';

interface WhereCondition {
  isAvailable: boolean;
  isDelete: boolean;
  name?: object;
}

export class MenuService {
  static async getAll(request: PaginationRequest): Promise<GetMenuResponse> {
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
  static async getDetail(id: number): Promise<MenuDetailResponse> {
    const menu = await prismaClient.menu.findUnique({
      where: {
        id,
      },
      include: {
        options: {
          include: {
            optionItem: true,
          },
        },
      },
    });

    if (!menu) {
      throw new ResponseError(404, 'Menu not found');
    }

    return toMenuDetailResponse(menu);
  }
  static async menuToBasket(request: MenuBasketItemRequest, userId: number): Promise<any> {
    const basketRequest = Validation.validate(MenuValidation.MENUTOBASKET, request);

    const menuExist = await prismaClient.menu.count({ where: { id: basketRequest.menuId } });
    if (menuExist == 0) {
      throw new ResponseError(404, 'Menu not found');
    }

    const menuOptionExist = await prismaClient.menuOption.count({ where: { menuId: basketRequest.menuId } });
    if (menuOptionExist > 0 && !basketRequest.basketItemOptions) {
      throw new ResponseError(400, 'Should include option');
    }

    if (basketRequest.basketItemOptions) {
      const idOfOptions = basketRequest.basketItemOptions.map((item: MenuBasketItemOptionRequest): number => item.optionId);
      const idOfOptionItems = basketRequest.basketItemOptions.map((item: MenuBasketItemOptionRequest): number => item.optionItemId);
    }

    let basket = await prismaClient.basket.findFirst({
      where: {
        customerId: userId,
        isActive: true,
      },
    });

    if (!basket) {
      basket = await prismaClient.basket.create({
        data: {
          customerId: userId,
          tableId: basketRequest.tableId,
        },
      });
    }

    // need continue
  }
}
