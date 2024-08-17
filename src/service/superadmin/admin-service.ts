import { hash } from 'bcryptjs';
import { prismaClient } from '../../application/database';
import { ResponseError } from '../../error/response-error';
import { CreateRequest, CreateResponse, toCreateResponse } from '../../model/superadmin/admin-model';
import { AdminManagementValidation } from '../../validation/superadmin/admin-validation';
import { Validation } from '../../validation/validation';

export class AdminManagementService {
  static async create(request: CreateRequest, adminId?: number): Promise<CreateResponse> {
    const createRequest = Validation.validate(AdminManagementValidation.CREATE, request);

    const totalUserWithSame = await prismaClient.admin.count({
      where: {
        OR: [{ email: createRequest.email }, { phoneNumber: createRequest.phoneNumber }],
      },
    });

    if (totalUserWithSame) {
      throw new ResponseError(400, 'Email or phone number has been used');
    }

    if (adminId) {
      createRequest.createdBy = adminId;
    }
    createRequest.password = await hash(createRequest.password, 10);

    const user = await prismaClient.admin.create({
      data: createRequest,
    });

    return toCreateResponse(user);
  }
}
