import { NextFunction, Response } from "express";
import { Request } from "express-jwt";

export default async function articlesUpdateValidator(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.body.article === undefined) {
    return res
      .status(400)
      .json({ body: ["article inside body must be a non empty object"] });
  }
  const { title, description, body } = req.body.article;
  const errors = [];

  if (title && typeof title != "string") errors.push("title must be a string");
  if (description && typeof description != "string")
    errors.push("description must be a string");
  if (body && typeof body != "string") errors.push("body must be a string");

  if (errors.length) {
    return res.status(400).json({ body: errors });
  }
  next();
}
