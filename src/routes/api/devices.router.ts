import { Router } from "express";
import { levelAuthGuard } from "@/middleware/user.guards.ts";
import passport from "passport";
import {
  deleteDeviceById,
  editDeviceById,
  getAllDevices,
  getDeviceById,
  getDevicesByDoorId,
} from "@/controllers/api/devices.controller.ts";

export const devicesRouter = Router();

devicesRouter.use(passport.authenticate("jwt", { session: false }));

devicesRouter.get("/", levelAuthGuard(2), getAllDevices);
devicesRouter.get("/:id", levelAuthGuard(2), getDeviceById);
devicesRouter.put("/:id", levelAuthGuard(3), editDeviceById);
devicesRouter.delete("/:id", levelAuthGuard(3), deleteDeviceById);
devicesRouter.get("/door/:id", levelAuthGuard(2), getDevicesByDoorId);
