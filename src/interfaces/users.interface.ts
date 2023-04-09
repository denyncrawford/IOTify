
import { ObjectId } from 'mongoose';

export enum UserType {
  ADMIN = 'admin',
  USER = 'user',
  GUEST = 'guest',
  TEMPORARY = 'temporary',
}

export interface IUserDTO {
  name: string;
  email: string;
  password: string;
  username: string;
  age?: number;
  type: UserType;
}

export interface IUserSensitiveFields {
  password: string;
}

export interface IUser extends IUserDTO {
  _id?: ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUserTokenPayload {
  username: string;
  type: UserType;
  _id?: ObjectId;
}

export type IUserSafeDTO = Omit<IUserDTO, keyof IUserSensitiveFields>;