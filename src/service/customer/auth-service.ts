import { compare, hash } from 'bcryptjs';
import { prismaClient } from '../../application/database';
import { ResponseError } from '../../error/response-error';
import { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse, toLoginResponse, toRegisterResponse } from '../../model/customer/auth-model';
import { AuthValidation } from '../../validation/customer/auth-validator';
import { Validation } from '../../validation/validation';
import { sign } from 'jsonwebtoken';

export class AuthService {
  static async register(request: RegisterRequest): Promise<RegisterResponse> {
    const registerRequest = Validation.validate(AuthValidation.REGISTER, request);

    const userExist = await prismaClient.customer.count({
      where: {
        OR: [
          {
            email: registerRequest.email,
          },
          {
            phoneNumber: registerRequest.phoneNumber,
          },
        ],
      },
    });

    if (userExist !== 0) {
      throw new ResponseError(409, 'Email or Phone Number has been used');
    }

    registerRequest.password = await hash(registerRequest.password, 10);

    const user = await prismaClient.customer.create({
      data: registerRequest,
    });

    return toRegisterResponse(user);
  }
  static async login(request: LoginRequest): Promise<LoginResponse> {
    const loginRequest = Validation.validate(AuthValidation.LOGIN, request);

    const customer = await prismaClient.customer.findUnique({
      where: {
        email: loginRequest.email,
      },
    });

    if (!customer) {
      throw new ResponseError(401, 'Email or password wrong');
    }

    const isPassword = await compare(loginRequest.password, customer.password);
    if (!isPassword) {
      throw new ResponseError(401, 'Email or password wrong');
    }

    const tokenSecret = process.env.TOKEN_SECRET || 'shhhhh';

    const tokenPayload = {
      id: customer.id,
      firstName: customer.firstName,
      lastName: customer.lastName,
      phoneNumber: customer.phoneNumber,
      email: customer.email,
    };

    const token = sign(tokenPayload, tokenSecret);

    return toLoginResponse(customer, token);
  }
}
