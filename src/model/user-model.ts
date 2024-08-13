import { User } from '@prisma/client';

export interface UserResponse {
  name: string;
  username: string;
}

export type CreateUserRequest = {
  username: string;
  name: string;
  password: string;
};

export const toUserResponse = (user: User): UserResponse => {
  return {
    name: user.name,
    username: user.username,
  };
};
export const toLoginResponse = (user: User, token: string): LoginResponse => {
  return {
    name: user.name,
    username: user.username,
    token,
  };
};

export interface LoginResponse extends UserResponse {
  token: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}
