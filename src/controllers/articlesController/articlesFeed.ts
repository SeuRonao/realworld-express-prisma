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

/**
 * Article controller that must receive a request with an authenticated user.
 * @param req Request with a jwt token verified
 * @param res Response
 * @param next NextFunction
 * @returns void
 */
export default async function articlesFeed(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { limit, offset } = parseQuery(req.query);
  const username = req.auth?.user?.username;

  try {
    // Get current user
    const currentUser = await userGetPrisma(username);
    if (!currentUser) return res.sendStatus(401);

    // Get articles feed
    const articles = await articleFeedPrisma(currentUser, limit, offset);

    // Create articles feed view
    const articlesFeedView = articles.map((article) =>
      currentUser ? articleViewer(article, currentUser) : articleViewer(article)
    );

    return res.json({
      articles: articlesFeedView,
      articlesCount: articlesFeedView.length,
    });
  } catch (error) {
    return next(error);
  }
}
