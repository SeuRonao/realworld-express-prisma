import { NextFunction, Request, Response } from "express";
import createUserToken from "../../utils/auth/createUserToken";
import userGetEmailPrisma from "../../utils/db/user/userGetEmailPrisma";
import userViewer from "../../view/userViewer";

/**
 * Controller for the login function sending a valid jwt token in the response if login is successful.
 * @param req Request in witch body contains a json with user object with name and email as properties.
 * @param res Response
 */
export default async function userLogin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { email, password } = req.body.user;
  let user;
  try {
    user = await userGetEmailPrisma(email);
  } catch (error) {
    return next(error);
  }
  if (!user) return res.sendStatus(404);
  if (user.password != password) return res.sendStatus(403);

  const token = createUserToken(user);
  const userView = userViewer(user, token);
  return res.json(userView);
}
