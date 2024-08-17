import { NextFunction, Request, Response } from 'express';
import { SuperadminRequest } from '../../type/superadmin-type';
import { CreateRequest, CreateResponse } from '../../model/superadmin/admin-model';
import { AdminManagementService } from '../../service/superadmin/admin-service';

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
}
