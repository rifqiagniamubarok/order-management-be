import { prismaClient } from '../../application/database';
import { CreateMenuRequest, CreateMenuResponse, toCreateMenuResponse } from '../../model/superadmin/menu-model';
import { MenuManagementValidation } from '../../validation/superadmin/menu-validation';
import { Validation } from '../../validation/validation';

export class MenuManagementService {
  static async create(request: CreateMenuRequest, adminId: number): Promise<CreateMenuResponse> {
    const createRequest = Validation.validate(MenuManagementValidation.CREATE, request);

    createRequest.createdBy = adminId;
    const menu = await prismaClient.menu.create({
      data: createRequest,
    });

    return toCreateMenuResponse(menu);
  }
}
