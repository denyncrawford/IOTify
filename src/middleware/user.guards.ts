// @deno-types="npm:@types/express@^4.17"
import { Request, Response, NextFunction } from "express";
import { IUser, UserType } from "@/interfaces/users.interface.ts";
import { userTypeLevels } from "@/constants/users.const.ts";

export const roleAuthGuard = (role: UserType | UserType[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as IUser;
    if (Array.isArray(role)) {
      if (role.includes(user.type)) {
        return next();
      }
    } else {
      if (role === user.type) {
        return next();
      }
    }
    return res.status(401).json({ message: "Unauthorized" });
  };
};

export const levelAuthGuard = (level: number) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as IUser;
    const userLevel = userTypeLevels[user.type];
    if (userLevel >= level) {
      return next();
    }
    return res.status(401).json({ message: "Unauthorized" });
  };
}