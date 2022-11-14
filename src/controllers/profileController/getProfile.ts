import { NextFunction, Response } from "express";
import { Request as JWTRequest } from "express-jwt";
import userGetPrisma from "../../utils/db/user/userGetPrisma";
import profileViewer from "../../view/profileViewer";

/**
 * Middleware that takes the username in the parameters and returns its profile.
 * @param req Request
 * @param res Response
 * @param next NextFunction
 * @returns
 */
export default async function getProfile(
  req: JWTRequest,
  res: Response,
  next: NextFunction
) {
  const { username } = req.params;
  const currentUsername = req.auth?.user.username; // The current user's username

  let currentUser;
  try {
    currentUser = await userGetPrisma(currentUsername);
  } catch (error) {
    return next(error);
  }

  let profile;
  try {
    profile = await userGetPrisma(username);
  } catch (error) {
    return next(error);
  }
  if (!profile) return res.sendStatus(404);

  const profileView = profileViewer(profile, currentUser || undefined);

  return res.json(profileView);
}
