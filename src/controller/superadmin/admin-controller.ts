import { NextFunction, Request, Response } from 'express';
import { SuperadminRequest } from '../../type/superadmin-type';
import { CreateRequest, EditRequest } from '../../model/superadmin/admin-model';
import { AdminManagementService } from '../../service/superadmin/admin-service';
import { PaginationRequest } from '../../model/general-model';

export class AdminManagementController {
  static async create(req: SuperadminRequest, res: Response, next: NextFunction) {
    try {
      const request: CreateRequest = req.body;
      const adminId = req?.admin?.id;
      const response = await AdminManagementService.create(request, adminId);

      res.status(201).json({
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

      const response = await AdminManagementService.getAll(request);

      res.status(200).json({
        success: true,
        ...response,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getDetail(req: SuperadminRequest, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const response = await AdminManagementService.getDetail(Number(id));

      res.status(200).json({
        success: true,
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  static async edit(req: SuperadminRequest, res: Response, next: NextFunction) {
    try {
      const request: EditRequest = req.body;
      const adminId = req?.admin?.id;
      const id = Number(req.params.id);
      const response = await AdminManagementService.edit(request, id, adminId);

      res.status(200).json({
        success: true,
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }
}
