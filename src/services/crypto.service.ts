import { genSalt, hash, compare } from 'bcrypt';

export const createPasswordHash = async (password: string) => {
  const salt = await genSalt(10);
  const hashResult = await hash(password, salt);
  return hashResult;
}

export const comparePasswordHash = async (password: string, hash: string) => {
  const result = await compare(password, hash);
  return result;
}