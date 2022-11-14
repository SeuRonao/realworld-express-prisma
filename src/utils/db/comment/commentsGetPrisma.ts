import { User } from "@prisma/client";
import prisma from "../prisma";

export default async function commentsGetPrisma(slug: string, user?: User) {
  const comments = prisma.comment.findMany({
    where: { articleSlug: slug },
    include: {
      author: {
        include: { followedBy: { where: { username: user?.username } } },
      },
    },
  });
  return comments;
}
