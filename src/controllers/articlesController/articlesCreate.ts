import { Tag } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { NextFunction, Response } from "express";
import { Request as JWTRequest } from "express-jwt";
import prisma from "../../utils/db/prisma";
import logger from "../../utils/logger";

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
  const slug = (title as string)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
  const user = req.auth?.user;
  try {
    // Creating the tags for this article if they do not exist.
    const tags: Array<Tag> = [];
    if (tagList) {
      for (const tagName of tagList) {
        tags.push(
          await prisma.tag.upsert({
            create: { tagName },
            where: { tagName },
            update: {},
          })
        );
      }
    }
    // Creating the article with the current user as author.
    const article = await prisma.article.create({
      data: {
        slug,
        title,
        description,
        body,
        authorUsername: user.username,
        tagList: { connect: tags },
      },
      include: { tagList: true },
    });
    return res.status(201).json(article);
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      switch (error.code) {
        case "P2002":
          logger.debug(
            `Article with ${error.meta?.target} already exists in database`
          );
          return res.status(422).json({
            errors: {
              body: [`article with ${error.meta?.target} already exists`],
            },
          });
        default:
          logger.error(
            `Unhandled PrismaClientKnownRequestError with code ${error.code} in articlesCreate`
          );
          next(error);
      }
    }
  }
}
