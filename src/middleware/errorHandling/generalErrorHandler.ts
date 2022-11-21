import { NextFunction, Request, Response } from "express";
import logger from "../../utils/logger";

/**
 * Middleware that handles general errors not handled by other middleware.
 * The last line of defense against errors.
 * @param err Error
 * @param _req Request
 * @param res Response
 * @param _next NextFunction
 * @returns
 */
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
