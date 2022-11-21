import { NextFunction, Response } from "express";
import { Request } from "express-jwt";

/**
 * Middleware that validates the properties of the request for the comment creation controller.
 * @param req Request
 * @param res Response
 * @param next NextFunction
 * @returns
 */
export default function commentCreateValidator(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const comment = req.body.comment;
  if (!comment)
    return res
      .status(400)
      .json({ errors: { body: ["the body must contain a comment object"] } });
  if (typeof comment != "object")
    return res
      .status(400)
      .json({ errors: { body: ["the comment  must be an object"] } });
  const body = comment.body;
  if (!body || typeof body != "string")
    return res.status(400).json({
      errors: {
        body: ["there must be a body string property in the comment object"],
      },
    });
  next();
}
