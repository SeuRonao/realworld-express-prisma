import slugfy from "../../slugfy";
import prisma from "../prisma";

interface UpdateFields {
  title?: string;
  description?: string;
  body?: string;
}

export default async function articleUpdatePrisma(
  slug: string,
  info: UpdateFields
) {
  const newSlug = slugfy(slug);
  const article = await prisma.article.update({
    where: { slug },
    data: {
      ...info,
      slug: newSlug,
      updatedAt: new Date(),
    },
    include: {
      author: { include: { followedBy: true } },
      tagList: true,
      _count: { select: { favoritedBy: true } },
    },
  });
  return article;
}
