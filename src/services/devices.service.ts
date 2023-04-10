import { IDevice, IDeviceDTO } from "@/interfaces/devices.interface.ts";
import DeviceEntity from "@/entities/device.entity.ts";
import { addDeviceToDoor } from "./doors.service.ts";
import { ObjectId } from "mongoose";

export const createDevice = async (deviceData: IDeviceDTO): Promise<IDevice> => {
  try {
    const device = await DeviceEntity.create(deviceData);
    await addDeviceToDoor(device.doorId as ObjectId, device._id);
    return device;
  } catch (error) {
    throw new Error(error);
  }
}

export const getAllDevices = async (populate = false): Promise<IDevice[]> => {
  try {
    const devices = DeviceEntity.find<IDevice>({});
    if (populate) {
      devices.populate("door");
    }

    return await devices.exec();
  } catch (error) {
    throw new Error(error);
  }
}

export const getDeviceById = async (
  deviceId: string,
  populate = false,
): Promise<IDevice | null> => {
  try {
    const device = DeviceEntity.findById<IDevice>(
      deviceId,
    );
    if (populate) {
      device.populate("door");
    }
    return await device.exec();
  } catch (error) {
    throw new Error(error);
  }
}

export const editDeviceById = async (
  deviceId: string,
  payload: IDevice,
  populate = false,
): Promise<IDevice | null> => {
  try {
    const device = DeviceEntity.findByIdAndUpdate<IDevice>(
      deviceId,
      payload,
      { new: true },
    );
    if (populate) {
      device.populate("door");
    }
    return await device.exec();
  } catch (error) {
    throw new Error(error);
  }
}

export const deleteDeviceById = async (
  deviceId: string,
): Promise<IDevice | null> => {
  try {
    const device = DeviceEntity.findByIdAndDelete<IDevice>(deviceId);
    return await device.exec();
  } catch (error) {
    throw new Error(error);
  }
}

export const getDevicesByDoorId = async (
  doorId: string,
): Promise<IDevice[]> => {
  try {
    const devices = DeviceEntity.find<IDevice>({ door: doorId }).populate("door");
    return await devices.exec();
  } catch (error) {
    throw new Error(error);
  }
}