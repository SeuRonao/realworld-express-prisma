import { NextFunction, Response } from "express";
import { Request as JWTRequest } from "express-jwt";

export default async function articlesCreate(
  req: JWTRequest,
  res: Response,
  next: NextFunction
) {
  return res.sendStatus(501);
}
