import { hash } from 'bcryptjs';
import { prismaClient } from '../../application/database';
import { ResponseError } from '../../error/response-error';
import { CreateRequest, CreateResponse, GetAllResponse, PaginationRequest, PaginationResponse, toCreateResponse } from '../../model/superadmin/admin-model';
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

  static async getAll(request: PaginationRequest): Promise<GetAllResponse> {
    const paginationRequest = Validation.validate(AdminManagementValidation.GETALL, request);

    const { page, pageSize, search } = paginationRequest;

    let whereCondition = {};

    if (search && search.trim() !== '') {
      whereCondition = {
        OR: [
          { firstName: { contains: search, mode: 'insensitive' } },
          { lastName: { contains: search, mode: 'insensitive' } },
          { email: { contains: search, mode: 'insensitive' } },
        ],
      };
    }

    const total = await prismaClient.admin.count({
      where: whereCondition,
    });

    const admins = await prismaClient.admin.findMany({
      where: whereCondition,
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    const lastPage = Math.ceil(total / pageSize);
    const nextPage = page < lastPage ? page + 1 : page;
    const prevPage = page > 1 ? page - 1 : page;

    const pagination: PaginationResponse = {
      page,
      pageSize,
      lastPage,
      nextPage,
      prevPage,
      total,
    };

    if (search && search.trim() !== '') {
      pagination.search = search;
    }

    const data = admins.map((admin) => toCreateResponse(admin));

    return { data, pagination };
  }

  static async getDetail(id: number): Promise<CreateResponse> {
    const admin = await prismaClient.admin.findFirstOrThrow({
      where: {
        id,
      },
    });

    return toCreateResponse(admin);
  }
}
