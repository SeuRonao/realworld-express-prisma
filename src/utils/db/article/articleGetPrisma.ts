import prisma from "../prisma";

export default async function articleGetPrisma(slug: string) {
  const article = await prisma.article.findUnique({
    where: { slug },
    include: {
      author: { include: { followedBy: true } },
      tagList: true,
      _count: { select: { favoritedBy: true } },
    },
  });
  return article;
}
