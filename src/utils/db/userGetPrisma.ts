import prisma from "./prisma";

interface Includes {
  followers?: boolean;
  following?: boolean;
  authorship?: boolean;
  favorites?: boolean;
}

export default async function userGetPrisma(
  username: string,
  include: Includes
) {
  const user = await prisma.user.findUnique({
    where: { username },
    include: {
      article: include.authorship || false,
      followedBy: include.followers || false,
      follows: include.following || false,
      favorites: include.favorites || false,
    },
  });
  return user;
}
