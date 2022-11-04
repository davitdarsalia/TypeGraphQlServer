import { Request } from "express";
import { JwtPayload, sign } from "jsonwebtoken";
import { v1, v4 } from "uuid";

import { MiddlewareFn } from "type-graphql";
import { User } from "../entities/user.entity";
import { AuthContext } from "../types/authContext";
import { IPMiddleware } from "./ipAddress";

type tokenType = "Access" | "Refresh";

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

export const SignToken = (user: User, tokenType: tokenType): string => {
  return sign(
    {
      userId: user.id,
      email: user.email,
      issuedAt: new Date().toLocaleDateString(),
      version: `${v1()}-${v4()}/${v4()}`,
      clientIdentifier: IPMiddleware()
    },
    tokenType === "Access"
      ? "nd1infi84ng82n8f1n39ef953n4g8gn"
      : "fm294gj49gj924rj3g89n4g8n29gjnm92jgn95nh94nnhg4in3n9h4ihn3ignri3",
    {
      expiresIn: "1m",
    }
  );
};
