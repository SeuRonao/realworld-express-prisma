import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import createUserToken from "../../utils/auth/createUserToken";
import userGetPrisma from "../../utils/db/user/userGetPrisma";
import userViewer from "../../view/userViewer";

/**
 * User controller that gets the current user based on the JWT given.
 * @param req Request with an authenticated user on the auth property.
 * @param res Response
 * @param next NextFunction
 * @returns void
 */
export default async function userGet(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const username = req.auth?.user?.username;
  try {
    // Get current user
    const currentUser = await userGetPrisma(username);
    if (!currentUser) return res.sendStatus(404);

    // Create the authentication token
    const token = createUserToken(currentUser);

    // Create the user view with the authentication token
    const response = userViewer(currentUser, token);

    return res.json(response);
  } catch (error) {
    return next(error);
  }
}
