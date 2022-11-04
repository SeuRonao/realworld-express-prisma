import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "express-jwt";
import logger from "../../utils/logger";

export default function generalErrorHandler(
  err: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
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
  } else if (err instanceof PrismaClientKnownRequestError) {
    logger.error(
      `Unhandled PrismaClientKnownRequestError with code ${err.code} in generalErrorHandler`
    );
    return res.sendStatus(500);
  } else {
    // Se if body is not a valid JSON parse.
    try {
      JSON.parse(req.body);
    } catch (error) {
      if (error instanceof Error) console.log(error.message);
      logger.debug("Body is not a valid JSON.");
      return res.status(422).json({ errors: { body: ["not a valid json"] } });
    }
  }

  // This is an unknown type of error.
  logger.error(`Unhandled error ${err.name} in generalErrorHandler`);
  return res.sendStatus(500);
}
