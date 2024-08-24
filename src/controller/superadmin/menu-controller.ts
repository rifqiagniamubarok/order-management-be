import { NextFunction, Response, Request } from 'express';
import { CreateMenuOptionRequest, CreateMenuRequest } from '../../model/superadmin/menu-model';
import { MenuManagementService } from '../../service/superadmin/menu-service';
import { SuperadminRequest } from '../../type/superadmin-type';
import { PaginationRequest } from '../../model/general-model';

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
      res.status(200).json({
        success: true,
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }
  static async getAll(req: SuperadminRequest, res: Response, next: NextFunction) {
    try {
      const request: PaginationRequest = {
        page: parseInt(req.query.page as string, 10) || 1,
        pageSize: parseInt(req.query.pageSize as string, 10) || 10,
      };

      if (req.query.search) {
        request.search = req.query.search.toString();
      }

      const response = await MenuManagementService.getAll(request);

      res.status(200).json({
        success: true,
        ...response,
      });
    } catch (error) {
      next(error);
    }
  }
  static async createOption(req: SuperadminRequest, res: Response, next: NextFunction) {
    try {
      const request: CreateMenuOptionRequest = req.body;

      const response = await MenuManagementService.createOption(request);

      res.status(201).json({
        success: true,
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }
}
