import { User } from "@prisma/client";
import prisma from "../prisma";

export default async function articleFeedPrisma(
  currentUser: User & { follows: User[] },
  limit = 20,
  offset = 0
) {
  const articles = await prisma.article.findMany({
    include: {
      tagList: true,
      author: {
        include: { followedBy: { where: { username: currentUser.username } } },
      },
      _count: { select: { favoritedBy: true } },
    },
    take: limit,
    skip: offset,
  });
  return articles;
}
