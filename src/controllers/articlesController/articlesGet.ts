import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import articleGetPrisma from "../../utils/db/article/articleGetPrisma";
import userGetPrisma from "../../utils/db/user/userGetPrisma";
import articleViewer from "../../view/articleViewer";

/**
 * Article controller that must receive a request.
 * The parameters of the request must have a slug.
 * @param req Request with a an optional jwt token verified
 * @param res Response
 * @param next NextFunction
 * @returns void
 */
export default async function articlesGet(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const slug = req.params.slug;
  const username = req.auth?.user?.username;

  try {
    // Get current user
    const currentUser = await userGetPrisma(username);

    // Get the article
    const article = await articleGetPrisma(slug);
    if (!article) return res.sendStatus(404);

    // Create the article view
    const articleView = currentUser
      ? articleViewer(article, currentUser)
      : articleViewer(article);
    return res.status(200).json({ article: articleView });
  } catch (error) {
    return next(error);
  }
}
