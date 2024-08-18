import { NextFunction, Request, Response } from 'express';
import { CreateRequest, EditRequest } from '../../model/superadmin/table-model';
import { TableManagementService } from '../../service/superadmin/table-service';

export class TableManagementController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const request: CreateRequest = req.body;
      const response = await TableManagementService.create(request);
      res.status(201).json({
        success: true,
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await TableManagementService.getAll();
      res.status(200).json({
        success: true,
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }
  static async getDetail(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const response = await TableManagementService.getDetail(id);
      res.status(200).json({
        success: true,
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  static async edit(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const request: EditRequest = req.body;

      const response = await TableManagementService.edit(request, id);
      res.status(200).json({
        success: true,
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      await TableManagementService.delete(id);
      res.status(204).json({
        success: true,
      });
    } catch (error) {
      next(error);
    }
  }
}
