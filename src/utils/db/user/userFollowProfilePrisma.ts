import { User } from "@prisma/client";
import prisma from "../prisma";

export default async function userFollowProfilePrisma(
  currentUser: User,
  followUsername: string
) {
  const followed = await prisma.user.update({
    where: { username: followUsername },
    data: { followedBy: { connect: { username: currentUser.username } } },
    include: { followedBy: { where: { username: currentUser.username } } },
  });
  return followed;
}
