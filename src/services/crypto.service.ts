import { genSalt, hash, compare } from 'https://deno.land/x/bcrypt@v0.4.1/mod.ts';

export const createPasswordHash = async (password: string) => {
  const salt = await genSalt(10);
  const hashResult = await hash(password, salt);
  return hashResult;
}

export const comparePasswordHash = async (password: string, hash: string) => {
  const result = await compare(password, hash);
  return result;
}