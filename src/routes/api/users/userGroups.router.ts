import { Router, Request, Response } from "express";


export const userGroupsRouter = Router();

userGroupsRouter.get(
  "/",
  (_req: Request, res: Response) => {
    res.send("Hello World");
  }
);
