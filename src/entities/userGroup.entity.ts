
import { model, Schema } from "mongoose";
import { IUserGroup } from "@/interfaces/userGroups.interface.ts";

export const UserGroupSchema = new Schema<IUserGroup>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  users: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],
});

// Required fields formatting

UserGroupSchema.path("name").required(true, "Name is required");
UserGroupSchema.path("description").required(true, "Description is required");
UserGroupSchema.path("users").required(true, "Users is required");

// Update timestamps

UserGroupSchema.pre("save", function (next) {
  const now = new Date();
  if (!this.createdAt) {
    this.createdAt = now;
  }
  this.updatedAt = now;
  next();
});

// Export the userGroup entity

export default model<IUserGroup>("UserGroup", UserGroupSchema);

