import { Tag } from "@prisma/client";
import { NextFunction, Response } from "express";
import { Request as JWTRequest } from "express-jwt";
import articleCreatePrisma from "../../utils/db/articleCreatePrisma";
import tagsCreatePrisma from "../../utils/db/tagsCreatePrisma";
import userGetPrisma from "../../utils/db/userGetPrisma";
import articleViewer from "../../view/articleViewer";

interface Article {
  title: string;
  description: string;
  body: string;
  tagList?: Array<string>;
}

export default async function articlesCreate(
  req: JWTRequest,
  res: Response,
  next: NextFunction
) {
  const { title, description, body, tagList }: Article = req.body.article;
  const userName = req.auth?.user.username;

  // Get current user
  let currentUser;
  try {
    currentUser = await userGetPrisma(userName);
    if (!currentUser) return res.sendStatus(401);
  } catch (error) {
    return next(error);
  }

  // Create list of tags
  let tags: Tag[] = [];
  if (tagList && tagList.length > 0) {
    try {
      tags = await tagsCreatePrisma(tagList);
    } catch (error) {
      return next(error);
    }
  }

  // Create the article
  let article;
  try {
    article = await articleCreatePrisma(
      { title, description, body },
      tags,
      currentUser.username
    );
  } catch (error) {
    return next(error);
  }

  // Create article view
  const articleView = articleViewer(article, currentUser || undefined);
  return res.status(201).json(articleView);
}
