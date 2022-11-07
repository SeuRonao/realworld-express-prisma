import { Article, Tag, User } from "@prisma/client";
import profileViewer from "./profileViewer";

type FullArticle = Article & {
  tagList: Tag[];
  author: User;
  _count: { favoritedBy: number };
};

export default function articleViewer(
  article: FullArticle,
  currentUser?: User & { follows: User[]; favorites: Article[] }
) {
  const favorited =
    currentUser?.favorites.find((value) => value.slug == article.slug) && true;

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
    favoritesCount: article._count.favoritedBy,
    author: authorView,
  };
  return articleView;
}
