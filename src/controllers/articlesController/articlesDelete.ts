import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import articleDeletePrisma from "../../utils/db/article/articleDeletePrisma";
import userGetPrisma from "../../utils/db/user/userGetPrisma";
import articleViewer from "../../view/articleViewer";

/**
 * Article controller that must receive a request with an authenticated user.
 * The parameters of the request must have a slug.
 * @param req Request with a jwt token verified
 * @param res Response
 * @param next NextFunction
 * @returns void
 */
export default async function articlesDelete(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const slug = req.params.slug;
  const userName = req.auth?.user?.username;

  try {
    // Get current user
    const currentUser = await userGetPrisma(userName);
    if (!currentUser) return res.sendStatus(401);

    // Delete the article
    const article = await articleDeletePrisma(slug);

    // Create the deleted article view
    const articleView = articleViewer(article, currentUser);
    return res.status(200).json({ article: articleView });
  } catch (error) {
    return next(error);
  }
}
