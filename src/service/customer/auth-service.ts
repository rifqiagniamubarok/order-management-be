import { hash } from 'bcryptjs';
import { prismaClient } from '../../application/database';
import { ResponseError } from '../../error/response-error';
import { registerRequest, registerResponse, toRegisterResponse } from '../../model/customer/auth-model';
import { AuthValidation } from '../../validation/customer/auth-validator';
import { Validation } from '../../validation/validation';

export class AuthService {
  static async register(request: registerRequest): Promise<registerResponse> {
    const requestRegister = Validation.validate(AuthValidation.REGISTER, request);

    const userExist = await prismaClient.customer.count({
      where: {
        OR: [
          {
            email: requestRegister.email,
          },
          {
            phoneNumber: requestRegister.phoneNumber,
          },
        ],
      },
    });

    if (userExist !== 0) {
      throw new ResponseError(409, 'Email or Phone Number has been used');
    }

    requestRegister.password = await hash(requestRegister.password, 10);

    const user = await prismaClient.customer.create({
      data: requestRegister,
    });

    return toRegisterResponse(user);
  }
}
