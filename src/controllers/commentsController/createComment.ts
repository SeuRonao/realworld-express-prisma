import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import commentCreatePrisma from "../../utils/db/comment/commentCreatePrisma";
import userGetPrisma from "../../utils/db/user/userGetPrisma";
import commentViewer from "../../view/commentViewer";

/**
 * Comment controller that must receive a request with an authenticated user.
 * The parameters of the request must have a slug to the article the comment belongs to.
 * The body of the request must have an comment object with a body string.
 * @param req Request with a jwt token verified
 * @param res Response
 * @param next NextFunction
 * @returns void
 */
export default async function createComment(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const slug = req.params.slug;
  const { body: commentContent } = req.body.comment;
  const username = req.auth?.user?.username;

  try {
    // Get currentUser
    const currentUser = await userGetPrisma(username);
    if (!currentUser) return res.sendStatus(401);

    // Add comment to database
    const comment = await commentCreatePrisma(
      slug,
      commentContent,
      currentUser
    );

    // Create comment view
    const commentView = commentViewer(comment, currentUser);
    return res.status(201).json({ comment: commentView });
  } catch (error) {
    return next(error);
  }
}
