import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import createUserToken from "../../utils/auth/createUserToken";
import userUpdatePrisma from "../../utils/db/userUpdatePrisma";
import userViewer from "../../view/userViewer";

/**
 * Middleware that updates the current user with info given on the body of the request.
 * @param req Request
 * @param res Response
 * @param next NextFunction
 * @returns
 */
export default async function userUpdate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const username = req.auth?.user.username;
  const info = req.body.user;
  let user;
  try {
    user = await userUpdatePrisma(username, info);
  } catch (error) {
    return next(error);
  }
  if (!user) return res.sendStatus(404);

  const token = createUserToken(user);
  const userView = userViewer(user, token);
  return res.json(userView);
}
