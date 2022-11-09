import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import createUserToken from "../../utils/auth/createUserToken";
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
  req: Request,
  res: Response,
  next: NextFunction
) {
  const username = req.auth?.user.username;
  let currentUser;
  try {
    currentUser = await userGetPrisma(username);
  } catch (error) {
    return next(error);
  }
  if (!currentUser) return res.sendStatus(404);

  const token = createUserToken(currentUser);
  const response = userViewer(currentUser, token);
  return res.json(response);
}
