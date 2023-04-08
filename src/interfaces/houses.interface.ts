
import { ObjectId } from 'mongoose';
import { IDoor } from '@/interfaces/doors.interface.ts';
import { ManyToMany, Modify } from '../constants/interfaces/database.interface.ts';
import { IUserGroup } from './userGroups.interface.ts';

export interface IHouseDTO {
  name: string;
  description: string;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
  doors: ManyToMany<ObjectId>;
  userGroups: ManyToMany<ObjectId>;
}

export interface IHouseRaw extends IHouseDTO {
  _id: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export type IHouse = Modify<IHouseRaw, {
  doors: ManyToMany<IDoor>;
  userGroups: ManyToMany<IUserGroup>;
}>;
