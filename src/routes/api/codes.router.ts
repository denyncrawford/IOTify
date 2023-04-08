import { Router, Request, Response } from "express";

export const codesRouter = Router();

codesRouter.get("/", (_req: Request, res: Response) => {
  res.send("Codes");
});