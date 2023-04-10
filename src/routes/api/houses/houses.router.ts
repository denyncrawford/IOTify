import { Router } from "express";
import { doorsRouter } from "./doors.router.ts";
import { levelAuthGuard } from "@/middleware/user.guards.ts";
import {
  addDoorToHouse,
  addUserGroupToHouse,
  deleteHouseById,
  editHouseById,
  getAllHouses,
  getHouseById,
  getHouseDoors,
  getHouseUserGroups,
  removeDoorFromHouse,
  removeUserGroupFromHouse,
} from "@/controllers/api/houses.controller.ts";
import passport from "passport";

export const housesRouter = Router();

housesRouter.use(passport.authenticate("jwt", { session: false }));
housesRouter.use("/doors", doorsRouter);

housesRouter.get("/", levelAuthGuard(2), getAllHouses);
housesRouter.get("/:id", levelAuthGuard(2), getHouseById);
housesRouter.put("/:id", levelAuthGuard(3), editHouseById);
housesRouter.delete("/:id", levelAuthGuard(3), deleteHouseById);
housesRouter.get("/:id/doors", levelAuthGuard(2), getHouseDoors);
housesRouter.get("/:id/userGroups", levelAuthGuard(2), getHouseUserGroups);
housesRouter.post("/:id/doors", levelAuthGuard(3), addDoorToHouse);
housesRouter.post("/:id/userGroups", levelAuthGuard(3), addUserGroupToHouse);
housesRouter.delete(
  "/:id/doors/:doorId",
  levelAuthGuard(3),
  removeDoorFromHouse,
);
housesRouter.delete(
  "/:id/userGroups/:userGroupId",
  levelAuthGuard(3),
  removeUserGroupFromHouse,
);
