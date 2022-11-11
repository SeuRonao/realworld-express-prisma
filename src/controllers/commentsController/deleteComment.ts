import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import commentDeletePrisma from "../../utils/db/commentDeletePrisma";
import userGetPrisma from "../../utils/db/userGetPrisma";
import commentViewer from "../../view/commentViewer";

export default async function deleteComment(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const slug = req.params.slug;
  const id = parseInt(req.params.id);
  const username = req.auth?.user.username;

  try {
    // Get currentUser
    const currentUser = await userGetPrisma(username);
    if (!currentUser) return res.sendStatus(401);

    // Remove comment from database
    const comment = await commentDeletePrisma(slug, id, currentUser);
    if (!comment) return res.sendStatus(500);

    // Create comment view
    const commentView = commentViewer(comment, currentUser);
    return res.json(commentView);
  } catch (error) {
    return next(error);
  }
}
