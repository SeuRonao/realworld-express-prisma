import { Tag } from "@prisma/client";
import { NextFunction, Response } from "express";
import { Request as JWTRequest } from "express-jwt";
import articleCreatePrisma from "../../utils/db/articleCreatePrisma";
import tagsCreatePrisma from "../../utils/db/tagsCreatePrisma";

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
  const user = req.auth?.user;

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
      user.username
    );
    const tagList = article.tagList.map((tag) => tag.tagName);
    const response = { ...article, tagList };
    return res.status(201).json(response);
  } catch (error) {
    return next(error);
  }
}
