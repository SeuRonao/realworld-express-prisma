import { User } from "@prisma/client";
import prisma from "../prisma";

export default async function userUnFollowProfilePrisma(
  currentUser: User,
  unFollowUsername: string
) {
  const follows = await prisma.user.update({
    where: { username: unFollowUsername },
    data: { followedBy: { disconnect: { username: currentUser.username } } },
    include: { followedBy: { where: { username: currentUser.username } } },
  });
  return follows;
}
