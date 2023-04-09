import { ObjectId } from "mongoose";
import { Modify } from "../constants/interfaces/database.interface.ts";
import { IUser } from "./users.interface.ts";
import { IDoor } from "./doors.interface.ts";
import { IHouse } from "./houses.interface.ts";

// If house is null, then it is a global code
// If door is null, then it is a house code
// If door is not null, then it is a door code

export enum CodeType {
  GLOBAL = "global",
  HOUSE = "house",
  DOOR = "door",
}

export interface ICodeDTO {
  code?: string;
  name: string;
  description: string;
  user?: ObjectId;
  house?: ObjectId;
  door?: ObjectId;
  type: CodeType;
  expiresAt?: Date | null;
  enabled: boolean;
}

export interface ICodeRaw extends ICodeDTO {
  _id: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export type ICode = Modify<ICodeRaw, {
  user?: IUser;
  house?: IHouse;
  door?: IDoor;
}>;