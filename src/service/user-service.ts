import { sign } from 'jsonwebtoken';
import { prismaClient } from '../application/database';
import { ResponseError } from '../error/response-error';
import { CreateUserRequest, LoginRequest, LoginResponse, toLoginResponse, toUserResponse, UserResponse } from '../model/user-model';
import { UserValidation } from '../validation/user-validation';
import { Validation } from '../validation/validation';
import { hash, compare } from 'bcryptjs';

export class UserService {
  static async register(request: CreateUserRequest): Promise<UserResponse> {
    const registerRequest = Validation.validate(UserValidation.REGISTER, request);

    const totalUserWithSameUsername = await prismaClient.user.count({
      where: {
        username: registerRequest.username,
      },
    });

    if (totalUserWithSameUsername != 0) {
      throw new ResponseError(400, 'Username already exists');
    }

    registerRequest.password = await hash(registerRequest.password, 10);

    const user = await prismaClient.user.create({ data: registerRequest });

    return toUserResponse(user);
  }

  static async login(request: LoginRequest): Promise<LoginResponse> {
    const loginRequest = Validation.validate(UserValidation.LOGIN, request);

    const user = await prismaClient.user.findUniqueOrThrow({
      where: { username: loginRequest.username },
    });

    if (!user) {
      throw new ResponseError(400, 'Username or password wrong');
    }

    const token = sign({ id: user.id, name: user.name, username: user.username }, 'shhhhh');

    return toLoginResponse(user, token);
  }
}
