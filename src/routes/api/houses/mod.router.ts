import { Router, Request, Response } from "express";
import { doorsRouter } from "./doors.router.ts";

export const housesRouter = Router();

housesRouter.use("/doors", doorsRouter);

housesRouter.get("/", (_req: Request, res: Response) => {
  res.send("Houses");
});