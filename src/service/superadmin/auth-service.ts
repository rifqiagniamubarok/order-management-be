import { sign } from 'jsonwebtoken';
import { prismaClient } from '../../application/database';
import { ResponseError } from '../../error/response-error';
import { LoginRequest, LoginResponse, toLoginResponse } from '../../model/superadmin/auth-model';
import { AuthValidation } from '../../validation/superadmin/auth-validation';
import { Validation } from '../../validation/validation';
import { compare } from 'bcryptjs';
import { userSuperadminJwt } from '../../type/superadmin-type';

export class AuthService {
  static async login(request: LoginRequest): Promise<LoginResponse> {
    const loginRequest = Validation.validate(AuthValidation.LOGIN, request);

    const user = await prismaClient.admin.findUniqueOrThrow({
      where: { email: loginRequest.email },
    });

    if (!user) {
      throw new ResponseError(400, 'Username or password wrong');
    }

    const isPasswordTrue = await compare(loginRequest.password, user.password);

    if (!isPasswordTrue) {
      throw new ResponseError(400, 'Username or password wrong');
    }

    const tokenSecret = process.env.TOKEN_SECRET || 'shhhhh';

    const tokenPayload: userSuperadminJwt = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      email: user.email,
      role: user.role,
    };

    const token = sign(tokenPayload, tokenSecret);

    return toLoginResponse(user, token);
  }
}
