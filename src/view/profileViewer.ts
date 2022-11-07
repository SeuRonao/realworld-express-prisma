import { User } from "@prisma/client";
import prisma from "../utils/db/prisma";

export default async function profileViewer(user: User, userName?: string) {
  let follows = null;
  if (userName) {
    follows = await prisma.user.findFirst({
      where: {
        username: userName,
        follows: { some: { username: user.username } },
      },
    });
  }
  const userView = {
    username: user.username,
    bio: user.bio,
    image: user.image,
    following: follows ? true : false,
  };
  return userView;
}
