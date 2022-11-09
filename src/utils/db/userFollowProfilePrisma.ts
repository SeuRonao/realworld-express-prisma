import { User } from "@prisma/client";
import prisma from "./prisma";

export default async function userFollowProfilePrisma(
  user: User,
  followUsername: string
) {
  const follows = await prisma.user.update({
    where: { username: followUsername },
    data: { followedBy: { connect: { username: user.username } } },
  });
  return follows;
}
