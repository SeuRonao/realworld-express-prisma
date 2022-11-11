import { NextFunction, Response } from "express";
import { Request } from "express-jwt";

export default async function getComments(
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.sendStatus(501);
}
