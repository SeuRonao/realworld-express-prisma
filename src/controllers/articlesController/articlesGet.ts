import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import articleGetPrisma from "../../utils/db/article/articleGetPrisma";
import userGetPrisma from "../../utils/db/user/userGetPrisma";
import articleViewer from "../../view/articleViewer";

export default async function articlesGet(
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
    return next(error);
  }

  // Get the article
  let article;
  try {
    article = await articleGetPrisma(slug);
    if (!article) return res.sendStatus(404);
  } catch (error) {
    return next(error);
  }

  // Create the article view
  const articleView = articleViewer(article, currentUser || undefined);
  return res.status(200).json(articleView);
}
