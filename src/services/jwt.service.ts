// @deno-types="npm:@types/jsonwebtoken@^9.0.0"
import { sign } from 'npm:jsonwebtoken@9.0.0';
import { IUserTokenPayload } from '@/interfaces/users.interface.ts';
import { ENV } from '@/constants/env/mod.ts';

export const createToken = (user: IUserTokenPayload) => {
  console.log({ user })
  const token = sign(user, ENV.jwt.secret!, { expiresIn: '1h' });
  return token;
}