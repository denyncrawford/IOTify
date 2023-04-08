// @deno-types="npm:@types/express@^4.17"
import { Router, Request, Response } from "express";
import { authRouter } from "./auth.router.ts";

export const MainRouter = Router();

MainRouter.get("/", (_req: Request, res: Response) => {
  res.send("Hello World!");
});

MainRouter.use('/auth', authRouter)