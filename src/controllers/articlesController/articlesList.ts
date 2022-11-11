import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import { ParsedQs } from "qs";
import userGetPrisma from "../../utils/db/userGetPrisma";
import articlesListPrisma from "../../utils/db/articleListPrisma";
import articleViewer from "../../view/articleViewer";
import { User, Article } from "@prisma/client";

function parseArticleListQuery(query: ParsedQs) {
  let { tag, author, favorited } = query;
  const { limit, offset } = query;
  tag = tag ? (tag as string) : undefined;
  author = author ? (author as string) : undefined;
  favorited = favorited ? (favorited as string) : undefined;
  const limitNumber = limit ? parseInt(limit as string) : undefined;
  const offsetNumber = offset ? parseInt(offset as string) : undefined;
  return { tag, author, favorited, limit: limitNumber, offset: offsetNumber };
}

export default async function articlesList(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { tag, author, favorited, limit, offset } = parseArticleListQuery(
    req.query
  );
  const username = req.auth?.user.username;

  // Get current user
  let currentUser: (User & { favorites: Article[] }) | null;
  try {
    currentUser = await userGetPrisma(username);
  } catch (error) {
    return next(error);
  }

  // Get the articles
  let articles;
  try {
    articles = await articlesListPrisma(tag, author, favorited, limit, offset);
  } catch (error) {
    return next(error);
  }
  // Create articles view
  const articlesListView = articles.map((value) =>
    articleViewer(value, currentUser || undefined)
  );
  return res.json({
    articles: articlesListView,
    articlesCount: articlesListView.length,
  });
}
