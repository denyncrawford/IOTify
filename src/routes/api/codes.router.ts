import { Router } from "express";
import { levelAuthGuard } from "@/middleware/user.guards.ts";
import passport from "passport";
import {
  deleteCodeById,
  getAllCodes,
  getCodeById,
  editCodeById,
  revokeCode,
  createCode,
} from "@/controllers/api/codes.controller.ts";

export const codesRouter = Router();

codesRouter.use(passport.authenticate("jwt", { session: false }));

codesRouter.post("/", levelAuthGuard(3), createCode);
codesRouter.get("/", levelAuthGuard(2), getAllCodes);
codesRouter.get("/:id", levelAuthGuard(2), getCodeById);
codesRouter.put("/:id", levelAuthGuard(3), editCodeById);
codesRouter.delete("/:id", levelAuthGuard(3), deleteCodeById);
codesRouter.post("/revoke", levelAuthGuard(3), revokeCode);