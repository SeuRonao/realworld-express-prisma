import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import userGetPrisma from "../../utils/db/user/userGetPrisma";
import userUnFollowProfilePrisma from "../../utils/db/user/userUnFollowProfilePrisma";
import profileViewer from "../../view/profileViewer";

/**
 * Profile controller that removes the username in the parameters to the current user followers list.
 * @param req Request with an authenticated user in the auth property
 * @param res Response
 * @param next NextFunction
 * @returns
 */
export default async function unFollowProfile(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const username = req.params.username;
  const currentUsername = req.auth?.user?.username;

  try {
    // Get current user
    const currentUser = await userGetPrisma(currentUsername);
    if (!currentUser) return res.sendStatus(401);

    // Get the desired profile
    const profile = await userUnFollowProfilePrisma(currentUser, username);

    // Create the profile view
    const profileView = profileViewer(profile, currentUser);
    return res.json({ profile: profileView });
  } catch (error) {
    return next(error);
  }
}
