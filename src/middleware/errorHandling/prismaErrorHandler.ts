import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { NextFunction, Request, Response } from "express";
import logger from "../../utils/logger";

export default async function prismaErrorHandler(
  err: Error,
  _req: Request,
  res: Response,
  next: NextFunction
) {
  if (!(err instanceof PrismaClientKnownRequestError)) return next(err);

  logger.debug(`PrismaKnowRequestError with code ${err.code}`);
  switch (err.code) {
    case "P2002":
      return res
        .status(422)
        .json({ errors: [`the field ${err.meta?.target} is not unique`] });
    case "P2025":
      return res.status(422).json({
        errors: [`${err.meta?.cause}`],
      });
    default:
      logger.debug(
        `Unhandled error with code ${err.code} in prismaErrorHandler`
      );
      return res.sendStatus(500);
  }
}
