import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import articleDeletePrisma from "../../utils/db/articleDeletePrisma";
import userGetPrisma from "../../utils/db/userGetPrisma";
import articleViewer from "../../view/articleViewer";

export default async function articlesDelete(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const slug = req.params.slug;
  const userName = req.auth?.user.username;

  // Get current user
  let currentUser;
  try {
    currentUser = await userGetPrisma(userName);
  } catch (error) {
    return next(error);
  }

  // Delete the article
  let article;
  try {
    article = await articleDeletePrisma(slug);
  } catch (error) {
    return next(error);
  }

  // Create the deleted article view
  const articleView = articleViewer(article, currentUser || undefined);
  return res.status(200).json(articleView);
}
