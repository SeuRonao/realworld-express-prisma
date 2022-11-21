import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import commentsGetPrisma from "../../utils/db/comment/commentsGetPrisma";
import userGetPrisma from "../../utils/db/user/userGetPrisma";
import commentViewer from "../../view/commentViewer";

/**
 * Comment controller that must receive a request with an optionally authenticated user.
 * The parameters of the request must have a slug to the article the comment belongs to.
 * @param req Request with an optionally jwt token verified
 * @param res Response
 * @param next NextFunction
 * @returns void
 */
export default async function getComments(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const slug = req.params.slug;
  const username = req.auth?.user?.username;

  try {
    // Get current user from database
    const currentUser = await userGetPrisma(username);

    // Get comments from database
    const comments = currentUser
      ? await commentsGetPrisma(slug, currentUser)
      : await commentsGetPrisma(slug);

    // Create comment view
    const commentsView = comments.map((comment) =>
      currentUser ? commentViewer(comment, currentUser) : commentViewer(comment)
    );

    return res.json({ comments: commentsView });
  } catch (error) {
    return next(error);
  }
}
