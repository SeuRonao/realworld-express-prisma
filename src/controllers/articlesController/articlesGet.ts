import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import articleGetPrisma from "../../utils/db/articleGetPrisma";
import articleViewer from "../../view/articleViewer";

export default async function articlesGet(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const slug = req.params.slug;
  try {
    const article = await articleGetPrisma(slug);
    if (!article) return res.sendStatus(404);
    const articleView = await articleViewer(article, req.auth?.user.username);
    return res.status(200).json(articleView);
  } catch (error) {
    return next(error);
  }
}
