import { Router, Request, Response } from "express";

export const logsRouter = Router();

logsRouter.get("/", (_req: Request, res: Response) => {
  res.send("Codes");
});