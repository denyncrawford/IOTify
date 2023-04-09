import { ObjectId } from "mongoose";

export interface IDoorDTO {
  name: string;
  description: string;
  devices?: ObjectId[];
}

export interface IDoor extends IDoorDTO {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}