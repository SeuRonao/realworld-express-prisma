import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import articleFavoritePrisma from "../../utils/db/article/articleFavoritePrisma";
import userGetPrisma from "../../utils/db/user/userGetPrisma";
import articleViewer from "../../view/articleViewer";

export default async function articlesFavorite(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const slug = req.params.slug;
  const username = req.auth?.user.username;

  // Get current user
  let currentUser;
  try {
    currentUser = await userGetPrisma(username);
  } catch (error) {
    next(error);
  }
  if (!currentUser) return res.sendStatus(401);

  // Favorite the article
  let article;
  try {
    article = await articleFavoritePrisma(currentUser, slug);
  } catch (error) {
    next(error);
  }
  if (!article) return res.sendStatus(404);

  // Create article view
  const articleView = articleViewer(article, currentUser);
  return res.json(articleView);
}
