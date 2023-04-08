import { ObjectId } from 'mongoose';
import { Modify } from '@/constants/interfaces/database.interface.ts';
import { IHouse } from './houses.interface.ts';
import { IUser } from './users.interface.ts';

export interface IUserGroupDTO {
  name: string;
  description: string;
  users: ObjectId[];
  houses: ObjectId[];
}

export interface IUserGroupRaw extends IUserGroupDTO {
  _id: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export type IUserGroup = Modify<IUserGroupRaw, {
  users: IUser[];
  houses: IHouse[];
}>;