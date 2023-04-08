
import { model, Schema } from "mongoose";
import { IHouse } from "@/interfaces/houses.interface.ts";

export const HouseSchema = new Schema<IHouse>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  address: { type: String, required: false },
  city: { type: String, required: false },
  state: { type: String, required: false },
  zip: { type: String, required: false },
  country: { type: String, required: false },
  doors: [{ type: Schema.Types.ObjectId, ref: "Door" }],
  userGroups: [{ type: Schema.Types.ObjectId, ref: "UserGroup", required: true }],
});

// Required fields formatting

HouseSchema.path("name").required(true, "Name is required");
HouseSchema.path("description").required(true, "Description is required");
HouseSchema.path("userGroups").required(true, "UserGroups is required");

// Update timestamps

HouseSchema.pre("save", function (next) {
  const now = new Date();
  if (!this.createdAt) {
    this.createdAt = now;
  }
  this.updatedAt = now;
  next();
});

// Export the house entity

export default model<IHouse>("House", HouseSchema);