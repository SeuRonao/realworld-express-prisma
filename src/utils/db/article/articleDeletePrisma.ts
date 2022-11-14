import prisma from "../prisma";

export default async function articleDeletePrisma(slug: string) {
  const article = await prisma.article.delete({
    where: { slug },
    include: {
      author: { include: { followedBy: true } },
      tagList: true,
      _count: { select: { favoritedBy: true } },
    },
  });
  return article;
}
