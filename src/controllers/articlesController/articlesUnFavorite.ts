import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import articleUnFavoritePrisma from "../../utils/db/article/articleUnFavoritePrisma";
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
export default async function articlesUnFavorite(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const slug = req.params.slug;
  const username = req.auth?.user?.username;

  try {
    // Get current user
    let currentUser = await userGetPrisma(username);
    if (!currentUser) return res.sendStatus(401);

    // UnFavorite the article
    const article = await articleUnFavoritePrisma(currentUser, slug);
    if (!article) return res.sendStatus(404);

    // Retrieve current user after update of its favorited articles
    currentUser = await userGetPrisma(username);
    if (!currentUser) return res.sendStatus(500); // The user should not have disappeared after having un-favorited an article

    // Create article view
    const articleView = articleViewer(article, currentUser);
    return res.json({ article: articleView });
  } catch (error) {
    next(error);
  }
}
