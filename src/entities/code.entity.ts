import { model, Schema } from "mongoose";
import { ICode } from "@/interfaces/codes.interface.ts";

export const CodeSchema = new Schema<ICode>({
  code: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  house: { type: Schema.Types.ObjectId, ref: "House", required: false },
  user: { type: Schema.Types.ObjectId, ref: "User", required: false },
  door: { type: Schema.Types.ObjectId, ref: "Door", required: false },
  type: { type: String, required: true },
  expiresAt: { type: Date, required: false },
});

// Required fields formatting

CodeSchema.path("code").required(true, "Code is required");
CodeSchema.path("name").required(true, "Name is required");
CodeSchema.path("description").required(true, "Description is required");
CodeSchema.path("user").required(true, "User is required");
CodeSchema.path("type").required(true, "Type is required");

// Update timestamps

CodeSchema.pre("save", function (next) {
  const now = new Date();
  if (!this.createdAt) {
    this.createdAt = now;
  }
  this.updatedAt = now;
  next();
});

// Export the code entity

export default model<ICode>("Code", CodeSchema);


