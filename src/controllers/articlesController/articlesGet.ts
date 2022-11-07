import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import articleGetPrisma from "../../utils/db/articleGetPrisma";
import userGetPrisma from "../../utils/db/userGetPrisma";
import articleViewer from "../../view/articleViewer";

export default async function articlesGet(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const username = req.auth?.user.username as string;
  const slug = req.params.slug;
  try {
    const article = await articleGetPrisma(slug);
    if (!article) return res.sendStatus(404);

    const currentUser =
      (await userGetPrisma(username, { following: true })) || undefined;
    const articleView = articleViewer(article, currentUser);
    return res.status(200).json(articleView);
  } catch (error) {
    return next(error);
  }
}
