import * as dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

export default function createToken(information: string) {
  if (!process.env.JWT_SECRET)
    throw new Error("JWT_SECRET missing in environment.");
  const token = jwt.sign(information, process.env.JWT_SECRET);
  return token;
}
