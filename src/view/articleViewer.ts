import { Article, Tag, User } from "@prisma/client";
import profileViewer from "./profileViewer";

type FullArticle = Article & { tagList: Tag[]; author: User };

export default function articleViewer(
  article: FullArticle,
  currentUser?: User & { follows: User[] },
  favorited?: boolean,
  favoritesCount?: number
) {
  const tagListView = article.tagList.map((tag) => tag.tagName);

  const authorView = profileViewer(article.author, currentUser);

  const articleView = {
    slug: article.slug,
    title: article.title,
    description: article.description,
    body: article.body,
    tagList: tagListView,
    createdAt: article.createdAt,
    updatedAt: article.updatedAt,
    favorited: favorited ? true : false,
    favoritesCount: favoritesCount ? favoritesCount : 0,
    author: authorView,
  };
  return articleView;
}
