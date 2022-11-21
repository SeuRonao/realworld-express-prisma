import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import articleUpdatePrisma from "../../utils/db/article/articleUpdatePrisma";
import userGetPrisma from "../../utils/db/user/userGetPrisma";
import articleViewer from "../../view/articleViewer";

/**
 * Article controller that must receive a request with an authenticated user.
 * The parameters of the request must have a slug.
 * The body of the request must have an article object with title, description and body.
 * @param req Request with a jwt token verified
 * @param res Response
 * @param next NextFunction
 * @returns void
 */
export default async function articlesUpdate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const slug = req.params.slug;
  const { title, description, body } = req.body.article;
  const userName = req.auth?.user?.username;

  try {
    // Get current user
    const currentUser = await userGetPrisma(userName);
    if (!currentUser) return res.sendStatus(401);

    // Update the article
    const article = await articleUpdatePrisma(slug, {
      title,
      description,
      body,
    });

    // Create the article view
    const articleView = articleViewer(article, currentUser);
    return res.status(200).json({ article: articleView });
  } catch (error) {
    return next(error);
  }
}
