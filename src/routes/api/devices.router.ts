import { Router, Request, Response } from "express";

export const devicesRouter = Router();

devicesRouter.get("/", (_req: Request, res: Response) => {
  res.send("Devices");
});