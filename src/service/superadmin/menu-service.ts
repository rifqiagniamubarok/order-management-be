import { prismaClient } from '../../application/database';
import { ResponseError } from '../../error/response-error';
import { CreateMenuRequest, CreateMenuResponse, toCreateMenuResponse } from '../../model/superadmin/menu-model';
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

  static async getDetail(id: number): Promise<CreateMenuResponse> {
    const menu = await prismaClient.menu.findUnique({
      where: { id },
      include: { options: true, createdByAdmin: true, updatedByAdmin: true, deleteByAdmin: true },
    });

    if (!menu) {
      throw new ResponseError(404, 'Menu not found');
    }

    return toCreateMenuResponse(menu);
  }
}
