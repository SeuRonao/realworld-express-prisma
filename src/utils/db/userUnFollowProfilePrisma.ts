import { User } from "@prisma/client";
import prisma from "./prisma";

export default async function userUnFollowProfilePrisma(
  user: User,
  unFollowUsername: string
) {
  const follows = await prisma.user.update({
    where: { username: unFollowUsername },
    data: { followedBy: { disconnect: { username: user.username } } },
  });
  return follows;
}
