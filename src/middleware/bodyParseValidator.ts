import { NextFunction, Request, Response } from "express";
import logger from "../utils/logger";

export default function generalErrorHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Se if body is not a valid JSON parse.
  try {
    JSON.parse(req.body);
  } catch (error) {
    logger.debug("Body is not a valid JSON.");
    return res.status(422).json({ errors: { body: ["not a valid json"] } });
  }
  next();
}
