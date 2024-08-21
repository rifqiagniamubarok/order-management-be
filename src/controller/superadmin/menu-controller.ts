import { NextFunction, Response, Request } from 'express';
import { CreateMenuRequest } from '../../model/superadmin/menu-model';
import { MenuManagementService } from '../../service/superadmin/menu-service';
import { SuperadminRequest } from '../../type/superadmin-type';

export class MenuManagementController {
  static async create(req: SuperadminRequest, res: Response, next: NextFunction) {
    try {
      const request: CreateMenuRequest = req.body;
      const adminId = Number(req?.admin?.id);
      const response = await MenuManagementService.create(request, adminId);
      res.status(201).json({
        success: true,
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }
  static async getDetail(req: SuperadminRequest, res: Response, next: NextFunction) {
    try {
      const id = Number(req?.params?.id);
      const response = await MenuManagementService.getDetail(id);
      res.status(201).json({
        success: true,
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }
}
