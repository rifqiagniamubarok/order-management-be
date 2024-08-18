import { prismaClient } from '../../application/database';
import { CreateRequest, CreateResponse, toCreateResponse } from '../../model/superadmin/table-model';
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
    const table = await prismaClient.table.findFirstOrThrow({
      where: {
        id,
      },
    });

    return toCreateResponse(table);
  }
}
