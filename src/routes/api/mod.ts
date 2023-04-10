// @deno-types="npm:@types/express@^4.17"
import { Router } from "express";
import { usersRouter } from "./users/users.router.ts";
import { codesRouter } from "./codes.router.ts";
import { housesRouter } from "./houses/houses.router.ts";
import { logsRouter } from "./logs.router.ts";
import { devicesRouter } from "./devices.router.ts";

export const ApiRouter = Router()
  .use("/users", usersRouter)
  .use("/codes", codesRouter)
  .use("/houses", housesRouter)
  .use("/logs", logsRouter)
  .use("/devices", devicesRouter);
