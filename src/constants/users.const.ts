import { UserType } from "../interfaces/users.interface.ts";

export const userTypeLevels = {
  [UserType.ADMIN]: 3,
  [UserType.USER]: 2,
  [UserType.GUEST]: 1,
  [UserType.TEMPORARY]: 0,
};