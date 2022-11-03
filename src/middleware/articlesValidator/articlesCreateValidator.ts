import { NextFunction, Response } from "express";
import { Request } from "express-jwt";

export default async function articlesCreateValidator(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.body.article === undefined) {
    return res
      .status(400)
      .json({ body: ["article inside body must be a non empty object"] });
  }
  const { title, description, body, tagList } = req.body.article;
  const errors = [];

  // Checks if title description and body are present and non-empty strings.
  const requiredChecks = { title, description, body };
  for (const [variable, content] of Object.entries(requiredChecks)) {
    if (typeof content != "string" || content.length == 0) {
      errors.push(`${variable} field must be a non-empty string`);
    }
  }

  // Checks if tagList is an array of strings in case it is not undefined.
  if (tagList && !Array.isArray(tagList))
    errors.push("tagList must be an array of non-empty strings");
  else if (tagList) {
    let foundError = false;
    for (const tag of tagList) {
      if (typeof tag != "string" || tag.length == 0) {
        foundError = true;
      }
    }
    if (foundError)
      errors.push("tagList must be an array of non-empty strings");
  }

  if (errors.length) {
    return res.status(400).json({ body: errors });
  }
  next();
}
