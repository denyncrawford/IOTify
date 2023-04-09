import { ObjectId, SchemaDefinitionProperty } from 'mongoose';


export enum DeviceType {
  LOCK = 'lock',
  CAMERA = 'camera',
}

export interface IDeviceDTO {
  name: string;
  type: DeviceType;
  doorId: SchemaDefinitionProperty<ObjectId> ;
}

export interface IDevice extends IDeviceDTO {
  _id?: ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}