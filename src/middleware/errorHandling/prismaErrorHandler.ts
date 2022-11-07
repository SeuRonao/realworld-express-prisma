import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { NextFunction, Request, Response } from "express";
import logger from "../../utils/logger";

export default async function prismaErrorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!(err instanceof PrismaClientKnownRequestError)) return next(err);

  const target = err.meta && (err.meta.target as Array<string>).toString();
  switch (err.code) {
    case "P2002":
      return res
        .status(422)
        .json({ errors: [`the field ${target} is not unique`] });
    default:
      logger.debug(
        `Unhandled error with code ${err.code} in prismaErrorHandler`
      );
      return res.sendStatus(500);
  }
}
