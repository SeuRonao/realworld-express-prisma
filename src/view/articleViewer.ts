import { Article, Tag, User } from "@prisma/client";
import prisma from "../utils/db/prisma";
import profileViewer from "./profileViewer";

type FullArticle = Article & { tagList: Tag[]; author: User };

export default async function articleViewer(
  article: FullArticle,
  userName?: string
) {
  const tagListView = article.tagList.map((tag) => tag.tagName);

  const authorView = await profileViewer(article.author, userName);

  let favorited = undefined;
  if (userName) {
    favorited = await prisma.user.findFirst({
      where: {
        username: userName,
        favorites: { some: { slug: article.slug } },
      },
    });
  }

  const favoritesCount = await prisma.user.count({
    where: { favorites: { some: { slug: article.slug } } },
  });
  const articleView = {
    slug: article.slug,
    title: article.title,
    description: article.description,
    body: article.body,
    tagList: tagListView,
    createdAt: article.createdAt,
    updatedAt: article.updatedAt,
    favorited: favorited ? true : false,
    favoritesCount,
    author: authorView,
  };
  return articleView;
}
