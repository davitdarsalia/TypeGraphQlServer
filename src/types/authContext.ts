import { Request,Response } from "express";
import { User } from "../entities/user.entity";

export interface AuthContext {
  req: Request;
  res: Response;
  payload?: { userId: string };
}

