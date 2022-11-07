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
  let currentUser;
  try {
    currentUser = await userGetPrisma(userName, { favorites: true });
    if (!currentUser)
      throw new Error(`User ${userName} does not exist on the database`);
  } catch (error) {
    return next(error);
  }

  let tags: Tag[] = [];
  if (tagList && tagList.length > 0) {
    try {
      tags = await tagsCreatePrisma(tagList);
    } catch (error) {
      return next(error);
    }
  }
  try {
    const article = await articleCreatePrisma(
      { title, description, body },
      tags,
      currentUser.username
    );
    const articleView = articleViewer(article, currentUser);
    return res.status(201).json(articleView);
  } catch (error) {
    return next(error);
  }
}
