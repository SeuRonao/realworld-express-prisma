import { NextFunction, Request, Response } from "express";
import { createToken } from "../../utils/auth";
import userCreatePrisma from "../../utils/db/userCreatePrisma";
import userViewer from "../../view/userViewer";

/**
 * Middleware that registers the user with information given in the body of the request.
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
  let user;
  try {
    user = await userCreatePrisma(username, email, password);
  } catch (error) {
    return next(error);
  }
  const token = createToken(JSON.stringify({ user }));
  const userView = userViewer(user, token);
  return res.status(201).json(userView);
}
