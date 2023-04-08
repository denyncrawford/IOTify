import { Router } from "express";
import {
  createUser,
  deleteUserById,
  editUserById,
  getAllUsers,
  getMyProfile,
  getUserById,
} from "@/controllers/api/users.controller.ts";
// @deno-types="npm:@types/passport@^1.0.12"
import passport from "passport";
import { levelAuthGuard, roleAuthGuard } from "@/middleware/user.guards.ts";
import { UserType } from "@/interfaces/users.interface.ts";
import { userGroupsRouter } from "./userGroups.router.ts";

export const usersRouter = Router();

// Whole route authentication

usersRouter.use(passport.authenticate("jwt", { session: false }));

// Sub-routes

usersRouter.use("/groups", userGroupsRouter)


// Route pipelines

// Create a user
usersRouter.post("/", roleAuthGuard(UserType.ADMIN), createUser);

// Get all users
usersRouter.get("/", levelAuthGuard(2), getAllUsers);

// Edit a user by id
usersRouter.put(
  "/:id",
  roleAuthGuard(UserType.ADMIN),
  editUserById,
);

// Delete a user by id
usersRouter.delete(
  "/:id",
  roleAuthGuard(UserType.ADMIN),
  deleteUserById,
);

// Get my user

usersRouter.get(
  "/me",
  roleAuthGuard([UserType.ADMIN, UserType.USER]),
  getMyProfile,
);

// Get a user by id
usersRouter.get(
  "/:id",
  roleAuthGuard(UserType.ADMIN),
  getUserById,
);
