import { Comment, User } from "@prisma/client";
import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import commentsGetPrisma from "../../utils/db/comment/commentsGetPrisma";
import userGetPrisma from "../../utils/db/user/userGetPrisma";
import commentViewer from "../../view/commentViewer";

export default async function getComments(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const slug = req.params.slug;
  const username = req.auth?.user.username;

  try {
    // Get current user from database
    const currentUser = await userGetPrisma(username);

    // Get comments from database
    const comments = await commentsGetPrisma(slug, currentUser || undefined);

    // Create comment view
    const commentsView = comments.map(
      (comment: Comment & { author: User & { followedBy: User[] } }) =>
        commentViewer(comment, currentUser || undefined)
    );
    return res.json(commentsView);
  } catch (error) {
    return next(error);
  }
}
