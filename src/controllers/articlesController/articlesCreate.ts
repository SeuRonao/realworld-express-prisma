import { Tag } from "@prisma/client";
import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import articleCreatePrisma from "../../utils/db/article/articleCreatePrisma";
import tagsCreatePrisma from "../../utils/db/tag/tagsCreatePrisma";
import userGetPrisma from "../../utils/db/user/userGetPrisma";
import articleViewer from "../../view/articleViewer";

interface Article {
  title: string;
  description: string;
  body: string;
  tagList?: Array<string>;
}

/**
 * Article controller that must receive a request with an authenticated user.
 * The body of the request must have the article object that is an @interface Article.
 * @param req Request with a jwt token verified
 * @param res Response
 * @param next NextFunction
 * @returns void
 */
export default async function articlesCreate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { title, description, body, tagList }: Article = req.body.article;
  const userName = req.auth?.user?.username;

  try {
    // Get current user
    const currentUser = await userGetPrisma(userName);
    if (!currentUser) return res.sendStatus(401);

    // Create list of tags
    let tags: Tag[] = [];
    if (tagList && tagList.length > 0) {
      tags = await tagsCreatePrisma(tagList);
    }

    // Create the article
    const article = await articleCreatePrisma(
      { title, description, body },
      tags,
      currentUser.username
    );

    // Create article view
    const articleView = articleViewer(article, currentUser);
    return res.status(201).json({ article: articleView });
  } catch (error) {
    return next(error);
  }
}
