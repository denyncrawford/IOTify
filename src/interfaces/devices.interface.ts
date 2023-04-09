import { ObjectId, SchemaDefinitionProperty } from 'mongoose';


export enum DeviceType {
  LOCK = 'lock',
  CAMERA = 'camera',
}

// deviceId: is a unique identifier coming from the device
export interface IDeviceDTO {
  name: string;
  type: DeviceType;
  doorId: SchemaDefinitionProperty<ObjectId>;
  deviceId: string ;
}

export interface IDevice extends IDeviceDTO {
  _id?: ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}