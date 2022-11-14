import { Tag } from "@prisma/client";
import prisma from "../prisma";
import slugfy from "../../slugfy";

interface RequiredFields {
  title: string;
  description: string;
  body: string;
}

export default async function articleCreatePrisma(
  info: RequiredFields,
  tagList: Tag[],
  authorUsername: string
) {
  const slug = slugfy(info.title);
  const article = await prisma.article.create({
    data: {
      ...info,
      slug,
      authorUsername,
      tagList: { connect: tagList },
    },
    include: {
      author: { include: { followedBy: true } },
      tagList: true,
      _count: { select: { favoritedBy: true } },
    },
  });
  return article;
}
