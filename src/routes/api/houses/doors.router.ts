
import { Router, Request, Response } from "express";

export const doorsRouter = Router();

doorsRouter.get("/", (_req: Request, res: Response) => {
  res.send("Doors");
});