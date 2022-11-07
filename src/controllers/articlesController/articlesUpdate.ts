import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import { articleUpdatePrisma } from "../../utils/db";
import userGetPrisma from "../../utils/db/userGetPrisma";
import articleViewer from "../../view/articleViewer";

export default async function articlesUpdate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const slug = req.params.slug;
  const userName = req.auth?.user.username;
  const { title, description, body } = req.body.article;
  try {
    const currentUser =
      (await userGetPrisma(userName, {
        following: true,
        favorites: true,
      })) || undefined;
    const article = await articleUpdatePrisma(slug, {
      title,
      description,
      body,
    });
    const articleView = articleViewer(article, currentUser);
    return res.status(200).json(articleView);
  } catch (error) {
    next(error);
  }
}
