import { NextFunction, Request, Response } from "express";
import createUserToken from "../../utils/auth/createUserToken";
import userCreatePrisma from "../../utils/db/user/userCreatePrisma";
import userViewer from "../../view/userViewer";

/**
 * Users controller that registers the user with information given in the body of the request.
 * @param req Request
 * @param res Response
 * @param next NextFunction
 * @returns
 */
export default async function usersRegister(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { email, password, username } = req.body.user;
  try {
    // Create the new user on the database
    const user = await userCreatePrisma(username, email, password);

    // Create the authentication token for future use
    const token = createUserToken(user);

    // Create the user view with the authentication token
    const userView = userViewer(user, token);

    return res.status(201).json(userView);
  } catch (error) {
    return next(error);
  }
}
