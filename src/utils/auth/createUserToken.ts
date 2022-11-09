import { User } from "@prisma/client";
import * as dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

export default function createUserToken(user: User) {
  if (!process.env.JWT_SECRET)
    throw new Error("JWT_SECRET missing in environment.");
  const tokenObject = { user: { username: user.username, email: user.email } };
  const userJSON = JSON.stringify(tokenObject);
  const token = jwt.sign(userJSON, process.env.JWT_SECRET);
  return token;
}
