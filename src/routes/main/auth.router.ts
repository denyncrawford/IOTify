// @deno-types="npm:@types/express@^4.17"
import { Router } from "express";
// @deno-types="npm:@types/passport@^1.0.12"
import passport from "passport";
import { apiTokenFromUser, login } from "@/controllers/main/auth.controller.ts";
import { roleAuthGuard } from "@/middleware/user.guards.ts";
import { UserType } from "@/interfaces/users.interface.ts";

export const authRouter = Router();

authRouter.post(
  "/login",
  passport.authenticate("local", {
    session: false,
  }),
  login,
);

authRouter.post(
  "token",
  passport.authenticate("jwt", {
    session: false,
  }),
  roleAuthGuard([UserType.ADMIN]),
  apiTokenFromUser,
);
