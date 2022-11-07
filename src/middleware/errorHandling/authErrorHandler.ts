import { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "express-jwt";
import logger from "../../utils/logger";

export default async function authErrorHandler(
  err: Error,
  _req: Request,
  res: Response,
  next: NextFunction
) {
  // Se if authorization failed
  if (err instanceof UnauthorizedError) {
    switch (err.code) {
      case "credentials_required":
        logger.debug("Authorization token not found.");
        return res.sendStatus(401);
      case "credentials_bad_scheme":
        logger.debug("Authorization with bad scheme.");
        return res.status(400).json({
          errors: { header: ["authorization token with bad scheme"] },
        });
      case "invalid_token":
        logger.debug("Authorization token invalid.");
        return res
          .status(401)
          .json({ errors: { header: ["authorization token is invalid"] } });
      default:
        logger.error(`Unhandled UnauthorizedError with code ${err.code}`);
        return res.sendStatus(500);
    }
  }
  next(err);
}
