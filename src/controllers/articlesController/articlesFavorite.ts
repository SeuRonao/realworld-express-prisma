import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import articleFavoritePrisma from "../../utils/db/article/articleFavoritePrisma";
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
export default async function articlesFavorite(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const slug = req.params.slug;
  const username = req.auth?.user.username;

  try {
    // Get current user
    const currentUser = await userGetPrisma(username);
    if (!currentUser) return res.sendStatus(401);

    // Favorite the article
    const article = await articleFavoritePrisma(currentUser, slug);
    if (!article) return res.sendStatus(404);

    // Create article view
    const articleView = articleViewer(article, currentUser);
    return res.json(articleView);
  } catch (error) {
    next(error);
  }
}
