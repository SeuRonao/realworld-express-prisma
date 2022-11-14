import { Article, Tag, User } from "@prisma/client";
import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import { ParsedQs } from "qs";
import articleFeedPrisma from "../../utils/db/article/articleFeedPrisma";
import userGetPrisma from "../../utils/db/user/userGetPrisma";
import articleViewer from "../../view/articleViewer";

function parseQuery(query: ParsedQs) {
  const { limit, offset } = query;
  const limitNumber = limit ? parseInt(limit as string) : undefined;
  const offsetNumber = offset ? parseInt(offset as string) : undefined;
  return { limit: limitNumber, offset: offsetNumber };
}

export default async function articlesFeed(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { limit, offset } = parseQuery(req.query);
  const username = req.auth?.user.username;

  // Get current user
  let currentUser: (User & { follows: User[]; favorites: Article[] }) | null;
  try {
    currentUser = await userGetPrisma(username);
  } catch (error) {
    return next(error);
  }
  if (!currentUser) return res.sendStatus(401);

  // Get articles feed
  let articles;
  try {
    articles = await articleFeedPrisma(currentUser, limit, offset);
  } catch (error) {
    return next(error);
  }

  // Create articles feed view
  const articlesFeedView = articles.map(
    (
      article: Article & {
        tagList: Tag[];
        author: User & { followedBy: User[] };
        _count: { favoritedBy: number };
      }
    ) => articleViewer(article, currentUser || undefined)
  );

  return res.json({ articles: articlesFeedView });
}
