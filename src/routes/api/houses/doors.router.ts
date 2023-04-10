
import { Router } from "express";
import { levelAuthGuard } from "@/middleware/user.guards.ts";
import passport from "passport";
import {
  deleteDoorById,
  editDoorById,
  getAllDoors,
  getDoorById,
  createDoor,
  addDeviceToDoor,
} from "@/controllers/api/doors.controller.ts";

export const doorsRouter = Router();

doorsRouter.use(passport.authenticate("jwt", { session: false }));

doorsRouter.get("/", levelAuthGuard(2), getAllDoors);
doorsRouter.get("/:id", levelAuthGuard(2), getDoorById);
doorsRouter.put("/:id", levelAuthGuard(3), editDoorById);
doorsRouter.delete("/:id", levelAuthGuard(3), deleteDoorById);
doorsRouter.post("/", levelAuthGuard(3), createDoor);
doorsRouter.post("/device", levelAuthGuard(3), addDeviceToDoor);
