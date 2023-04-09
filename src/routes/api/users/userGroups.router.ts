import { Router } from "express";
import passport from "passport";
import { roleAuthGuard } from "@/middleware/user.guards.ts";
import { UserType } from "@/interfaces/users.interface.ts";
import {
  createUserGroup,
  getAllUserGroups,
  getUserGroupById,
  getUsersFromUserGroup,
  deleteUserGroupById,
  editUserGroupById,
  addUserToUserGroup,
} from "@/controllers/api/users.controller.ts";

export const userGroupsRouter = Router();

userGroupsRouter.use(passport.authenticate("jwt", { session: false }));

userGroupsRouter.get(
  "/",
  roleAuthGuard([UserType.ADMIN]),
  getAllUserGroups,
);

userGroupsRouter.get(
  "/:id",
  roleAuthGuard([UserType.ADMIN]),
  getUserGroupById,
);

userGroupsRouter.post(
  "/",
  roleAuthGuard([UserType.ADMIN]),
  createUserGroup,
);

userGroupsRouter.get(
  "/:id/users",
  roleAuthGuard([UserType.ADMIN]),
  getUsersFromUserGroup,
);

userGroupsRouter.post(
  "/:id/users",
  roleAuthGuard([UserType.ADMIN]),
  addUserToUserGroup,
);

userGroupsRouter.put(
  "/:id",
  roleAuthGuard([UserType.ADMIN]),
  editUserGroupById,
);

userGroupsRouter.delete(
  "/:id",
  roleAuthGuard([UserType.ADMIN]),
  deleteUserGroupById,
);
