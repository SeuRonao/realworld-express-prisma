import { NextFunction, Response } from "express";
import { Request as JWTRequest } from "express-jwt";
import { createToken } from "../../utils/auth";
import userGetPrisma from "../../utils/db/userGetPrisma";
import userViewer from "../../view/userViewer";

/**
 * Middleware that gets the current user based on the JWT given.
 * @param req Request
 * @param res Response
 * @param next NextFunction
 * @returns
 */
export default async function userGet(
  req: JWTRequest,
  res: Response,
  next: NextFunction
) {
  const { username } = req.auth && req.auth.user;
  let currentUser;
  try {
    currentUser = await userGetPrisma(username);
  } catch (error) {
    return next(error);
  }
  if (!currentUser) return res.sendStatus(404);
  const token = createToken(JSON.stringify({ currentUser }));
  const response = userViewer(currentUser, token);
  return res.json(response);
}
