import { prismaClient } from '../../application/database';
import { ResponseError } from '../../error/response-error';
import { CreateRequest, CreateResponse, EditRequest, toCreateResponse } from '../../model/superadmin/table-model';
import { TableManagementValidation } from '../../validation/superadmin/table-validation';
import { Validation } from '../../validation/validation';

export class TableManagementService {
  static async create(request: CreateRequest): Promise<CreateResponse> {
    const createRequest = Validation.validate(TableManagementValidation.CREATE, request);

    const table = await prismaClient.table.create({
      data: createRequest,
    });

    return toCreateResponse(table);
  }

  static async getAll(): Promise<Array<CreateResponse>> {
    const tables = await prismaClient.table.findMany();

    const response = tables.map((table) => toCreateResponse(table));
    return response;
  }

  static async getDetail(id: number): Promise<CreateResponse> {
    const table = await prismaClient.table.findUnique({
      where: {
        id,
      },
    });

    if (!table) {
      throw new ResponseError(404, 'Table not found');
    }

    return toCreateResponse(table);
  }

  static async edit(request: EditRequest, id: number): Promise<CreateResponse> {
    const editRequest = Validation.validate(TableManagementValidation.EDIT, request);

    const isTableExist = await prismaClient.table.findUnique({ where: { id } });
    if (!isTableExist) {
      throw new ResponseError(404, 'Table not found');
    }

    const table = await prismaClient.table.update({
      where: {
        id,
      },
      data: editRequest,
    });

    return toCreateResponse(table);
  }

  static async delete(id: number): Promise<void> {
    const isTableExist = await prismaClient.table.findUnique({ where: { id } });
    if (!isTableExist) {
      throw new ResponseError(404, 'Table not found');
    }

    await prismaClient.table.delete({
      where: {
        id,
      },
    });

    return;
  }
}
