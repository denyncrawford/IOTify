// @deno-types="npm:@types/express@^4.17"
import { Request, Response } from "express";
// @deno-types="npm:@types/passport@^1.0.12"
import passport from "passport";
// @deno-types="npm:@types/passport-local@^1.0.0"
import { Strategy as LocalStrategy } from "passport-local";
// @deno-types="npm:@types/passport-jwt@^3.0.8"
import { Strategy as JwtStrategy } from "passport-jwt";
import { getUserByEmailOrUsername } from "../../services/users.service.ts";
import { comparePasswordHash } from "../../services/crypto.service.ts";
import { createToken } from "../../services/jwt.service.ts";
import { IUser, IUserTokenPayload } from "../../interfaces/users.interface.ts";
import { ENV } from "@/constants/env/mod.ts";

passport.use(new LocalStrategy({
  usernameField: "email",
  passwordField: "password",
},async (email, password, done) => {
  console.log({ email, password })
  try {
    const user = await getUserByEmailOrUsername(email);
    if (!user) {
      return done(null, false);
    }
    const isPasswordValid = await comparePasswordHash(password, user.password);
    if (!isPasswordValid) {
      return done(null, false);
    }
    // console.log({ user })
    return done(null, user);
  } catch (error) {
    return done(error);
  }
}));

passport.use(new JwtStrategy({
  jwtFromRequest: (req: Request) => req.cookies ? req.cookies.jwt : null,
  secretOrKey: ENV.jwt.secret,
}, async (payload: IUserTokenPayload, done) => {
  try {
    const user = await getUserByEmailOrUsername(undefined, payload.username);
    if (!user) {
      return done(null, false);
    }
    return done(null, user);
  } catch (error) {
    return done(error);
  }
}));


export const login = (req: Request, res: Response) => {
  const { user } = req;
  const { _id, type, username } = user as IUser;
  const token = createToken({ _id, type, username });
  res.cookie("jwt", token, { httpOnly: true });
  return res.json({ token });
}
  