import { model, Schema } from "mongoose";
import { IDevice, DeviceType } from "@/interfaces/devices.interface.ts";

export const DeviceSchema = new Schema<IDevice>({
  name: { type: String, required: true },
  type: { type: String, required: true, default: DeviceType.LOCK },
  doorId: { type: Schema.Types.ObjectId, required: true },
});

// Required fields formatting

DeviceSchema.path("name").required(true, "Name is required");
DeviceSchema.path("type").required(true, "Type is required");
DeviceSchema.path("doorId").required(true, "DoorId is required");
DeviceSchema.path("deviceId").required(true, "DeviceId is required");

// Update timestamps

DeviceSchema.pre("save", function (next) {
  const now = new Date();
  if (!this.createdAt) {
    this.createdAt = now;
  }
  this.updatedAt = now;
  next();
});

// Export the device entity

export default model<IDevice>("Device", DeviceSchema);