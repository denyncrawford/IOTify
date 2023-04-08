// @deno-types="npm:@types/express@^4.17"
import express, { json, urlencoded } from "express";
import { connect as connectMongo } from "mongoose";
// @deno-types="npm:@types/cookie-parser@^1.4.3"
import cookieParser from "cookie-parser";
import { ApiRouter } from "@/routes/api/mod.ts";
import { MainRouter } from "@/routes/main/mod.ts";
import { ENV } from "@/constants/env/mod.ts";
import passport from "passport";

const port = ENV.port || 3000;

const mongoUri = `mongodb://${ENV.db.host}:${ENV.db.port}/${ENV.db.name}` ||
  "mongodb://localhost:27017/deno";

// App initialization

const app = express();
await connectMongo(mongoUri);

// App configuration

app.use(passport.initialize());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser(ENV.jwt.secret));

// App routes

app.use("/", MainRouter);
app.use("/api", ApiRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
