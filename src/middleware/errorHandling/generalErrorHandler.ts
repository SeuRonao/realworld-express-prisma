import { NextFunction, Request, Response } from "express";
import logger from "../../utils/logger";

export default function generalErrorHandler(
  err: Error,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
) {
  // This is an unknown type of error.
  logger.error(`Unhandled error in generalErrorHandler`);
  logger.error(`${err.message}\n${err.name}\n${err.stack}`);
  return res.sendStatus(500);
}
