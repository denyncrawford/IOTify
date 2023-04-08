// @deno-types="npm:@types/express@^4.17"
import { Router } from "express";
// @deno-types="npm:@types/passport@^1.0.12"
import passport from "passport";
import { login } from "@/controllers/main/auth.controller.ts";

export const authRouter = Router();

authRouter.post("/login", passport.authenticate("local", {
  session: false,
}), login);

