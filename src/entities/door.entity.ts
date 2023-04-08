
import { model, Schema } from "mongoose";
import { IDoor } from "@/interfaces/doors.interface.ts";

export const DoorSchema = new Schema<IDoor>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  devices: [{ type: Schema.Types.ObjectId, ref: "Device" }],
});

// Required fields formatting

DoorSchema.path("name").required(true, "Name is required");
DoorSchema.path("description").required(true, "Description is required");

// Update timestamps

DoorSchema.pre("save", function (next) {
  const now = new Date();
  if (!this.createdAt) {
    this.createdAt = now;
  }
  this.updatedAt = now;
  next();
});

// Export the door entity

export default model<IDoor>("Door", DoorSchema);