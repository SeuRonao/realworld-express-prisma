import { Tag } from "@prisma/client";
import prisma from "./prisma";
import slugfy from "../slugfy";
import { ErrorContext } from "../types/errorContext";
import prismaErrorHandler from "../prismaErrorHandler";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";

interface RequiredFields {
  title: string;
  description: string;
  body: string;
}

export default async function articleCreatePrisma(
  info: RequiredFields,
  tagList: Tag[],
  authorUsername: string
) {
  const slug = slugfy(info.title);
  try {
    const article = await prisma.article.create({
      data: {
        ...info,
        slug,
        authorUsername,
        tagList: { connect: tagList },
      },
      include: { tagList: true },
    });
    return article;
  } catch (error) {
    const context: ErrorContext = {
      action: "create",
      object: "article",
    };
    if (error instanceof PrismaClientKnownRequestError) {
      const prismaError = prismaErrorHandler(error, context);
      throw prismaError;
    }
    throw error;
  }
}
