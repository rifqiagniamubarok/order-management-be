import { sign } from 'jsonwebtoken';
import { prismaClient } from '../../application/database';
import { ResponseError } from '../../error/response-error';
import { LoginRequest, LoginResponse, toLoginResponse } from '../../model/superadmin/auth-model';
import { AuthValidation } from '../../validation/superadmin/auth-validation';
import { Validation } from '../../validation/validation';

export class AuthService {
  static async login(request: LoginRequest): Promise<LoginResponse> {
    const loginRequest = Validation.validate(AuthValidation.LOGIN, request);

    const user = await prismaClient.admin.findUniqueOrThrow({
      where: { email: loginRequest.email },
    });

    if (!user) {
      throw new ResponseError(400, 'Username or password wrong');
    }

    const tokenSecret = process.env.TOKEN_SECRET || 'shhhhh';

    const token = sign({ id: user.id, firstName: user.firstName, lastName: user.lastName, phoneNumber: user.phoneNumber, email: user.email }, tokenSecret);

    return toLoginResponse(user, token);
  }
}
