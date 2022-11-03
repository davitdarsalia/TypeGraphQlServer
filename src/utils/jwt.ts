import { Request } from "express";
import { JwtPayload, sign, verify } from "jsonwebtoken";

import { User } from "../entities/user.entity";
import { MiddlewareFn } from "type-graphql";
import { AuthContext } from "../types/authContext";
import { signature } from "../modules/user/login";

export interface CustomRequest extends Request {
  token: string | JwtPayload;
}

export const isAuth: MiddlewareFn<AuthContext> = ({ context }, next) => {
  const authorization = context.req.headers["authorization"];

  if (!authorization) {
    throw new Error("Not authenticated");
  }

  return next();
};
