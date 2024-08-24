import { sign } from 'jsonwebtoken';

export const toSignToken = (payload: object): string => {
  const tokenSecret = process.env.TOKEN_SECRET || 'shhhhh';
  const token = sign(payload, tokenSecret);

  return token;
};
