import { IDoor, IDoorDTO } from "@/interfaces/doors.interface.ts";
import { IDevice } from "@/interfaces/devices.interface.ts";
import DoorEntity from "@/entities/door.entity.ts";
import deviceEntity from "@/entities/device.entity.ts";
import { ObjectId } from "mongoose";

export const createDoor = async (doorData: IDoorDTO): Promise<IDoor> => {
  try {
    const door = await DoorEntity.create(doorData);
    return door;
  } catch (error) {
    throw new Error(error);
  }
};

export const getAllDoors = async (populate = false): Promise<IDoor[]> => {
  try {
    const doors = DoorEntity.find<IDoor>({});
    if (populate) {
      doors.populate("devices");
    }

    return await doors.exec();
  } catch (error) {
    throw new Error(error);
  }
};

export const getDoorById = async (
  doorId: string,
  populate = false,
): Promise<IDoor | null> => {
  try {
    const door = DoorEntity.findById<IDoor>(
      doorId,
    );
    if (populate) {
      door.populate("devices");
    }
    return await door.exec();
  } catch (error) {
    throw new Error(error);
  }
};

export const editDoorById = async (
  doorId: string,
  payload: IDoor,
  populate = false,
): Promise<IDoor | null> => {
  try {
    const door = DoorEntity.findByIdAndUpdate<IDoor>(
      doorId,
      payload,
      { new: true },
    );
    if (populate) {
      door.populate("devices");
    }
    return await door.exec();
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteDoorById = async (doorId: string): Promise<IDoor | null> => {
  try {
    const door = DoorEntity.findByIdAndDelete<IDoor>(doorId);
    return await door.exec();
  } catch (error) {
    throw new Error(error);
  }
};

export const getDoorDevices = async (
  doorId: string,
): Promise<IDoor | null> => {
  try {
    const door = DoorEntity.findById<IDoor>(
      doorId,
      { devices: 1 },
    ).populate("devices");
    return await door.exec();
  } catch (error) {
    throw new Error(error);
  }
};

export const addDeviceToDoor = async (
  doorId: ObjectId,
  deviceId: ObjectId,
): Promise<IDoor | null> => {
  try {
    const device = deviceEntity.findById<IDevice>(deviceId);
    if (!device) {
      throw new Error("Device not found");
    }
    return await DoorEntity.findByIdAndUpdate<IDoor>(
      doorId,
      { $push: { devices: deviceId } },
      { new: true },
    ).exec();
  } catch (error) {
    throw new Error(error);
  }
};
