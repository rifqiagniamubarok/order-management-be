import { NextFunction, Request, Response } from 'express';
import { CustomerRequest } from '../../type/customer-type';
import { PaginationRequest, toPaginationRequest } from '../../model/general-model';
import { MenuService } from '../../service/customer/menu-service';

export class MenuController {
  static async getAll(req: CustomerRequest, res: Response, next: NextFunction) {
    try {
      const request: PaginationRequest = toPaginationRequest(req);

      const response = await MenuService.getAll(request);

      res.status(200).json({
        success: true,
        ...response,
      });
    } catch (error) {
      next(error);
    }
  }
  static async getDetail(req: CustomerRequest, res: Response, next: NextFunction) {
    try {
      const id: number = Number(req.params.id);
      const response = await MenuService.getDetail(id);

      res.status(200).json({
        success: true,
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }
}
