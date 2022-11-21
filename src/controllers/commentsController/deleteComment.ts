import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import commentDeletePrisma from "../../utils/db/comment/commentDeletePrisma";
import userGetPrisma from "../../utils/db/user/userGetPrisma";
import commentViewer from "../../view/commentViewer";

/**
 * Comment controller that must receive a request with an authenticated user.
 * The parameters of the request must have a slug to the article the comment belongs to and the id of the comments that will be removed.
 * @param req Request with a jwt token verified
 * @param res Response
 * @param next NextFunction
 * @returns void
 */
export default async function deleteComment(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const slug = req.params.slug;
  const id = parseInt(req.params.id);
  const username = req.auth?.user?.username;

  try {
    // Get currentUser
    const currentUser = await userGetPrisma(username);
    if (!currentUser) return res.sendStatus(401);

    // Remove comment from database
    const comment = await commentDeletePrisma(slug, id, currentUser);
    if (!comment) return res.sendStatus(500);

    // Create comment view
    const commentView = commentViewer(comment, currentUser);
    return res.json({ comment: commentView });
  } catch (error) {
    return next(error);
  }
}
