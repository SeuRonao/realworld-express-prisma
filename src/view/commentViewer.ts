import { Comment, User } from "@prisma/client";
import profileViewer from "./profileViewer";

export default function commentViewer(
  comment: Comment & { author: User & { followedBy: User[] } },
  currentUser?: User
) {
  const commentView = {
    id: comment.id,
    createdAt: comment.createdAt,
    updatedAt: comment.updatedAt,
    body: comment.body,
    author: profileViewer(comment.author, currentUser),
  };
  return commentView;
}
