import { model, Schema } from "mongoose";
import { IUser, UserType } from "@/interfaces/users.interface.ts";
import { createPasswordHash } from "../services/crypto.service.ts";

export const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  type: { type: String, default: UserType.USER },
});

// Required fields formatting

UserSchema.path("email").required(true, "Email is required");
UserSchema.path("password").required(true, "Password is required");
UserSchema.path("name").required(true, "Name is required");
UserSchema.path("username").required(true, "Username is required");

// Database validations

UserSchema.path("email").validate(
  (email: string) => {
    const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return emailRegex.test(email);
  },
  "The e-mail field must be a valid email address.",
);

UserSchema.path("password").validate(
  (password: string) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return passwordRegex.test(password);
  },
  "Password must contain at least 8 characters, one uppercase letter, one lowercase letter and one number.",
);

// Replace password with hash

UserSchema.pre("save", async function (next) {
  this.password = await createPasswordHash(this.password);
  next();
});

// Export the user entity

export default model<IUser>("User", UserSchema);
