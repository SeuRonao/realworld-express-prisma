import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import prismaErrorHandler from "../prismaErrorHandler";
import { ErrorContext } from "../types/errorContext";
import prisma from "./prisma";

export default async function tagsCreatePrisma(tags: Array<string>) {
  const createdTags = [];
  try {
    for (const tag of tags) {
      createdTags.push(
        await prisma.tag.upsert({
          create: { tagName: tag },
          where: { tagName: tag },
          update: {},
        })
      );
    }
    return createdTags;
  } catch (error) {
    const context: ErrorContext = {
      action: "create",
      object: "tag",
    };
    if (error instanceof PrismaClientKnownRequestError) {
      const prismaError = prismaErrorHandler(error, context);
      throw prismaError;
    }
    throw error;
  }
}
