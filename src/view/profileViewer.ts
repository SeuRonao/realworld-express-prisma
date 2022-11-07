import { User } from "@prisma/client";

type UserWithFollow = User & { follows: User[] };

export default function profileViewer(
  user: User,
  currentUser?: UserWithFollow
) {
  let follows = false;
  if (
    currentUser &&
    currentUser.follows.find(
      (userFollowed) => userFollowed.username == user.username
    )
  )
    follows = true;
  const userView = {
    username: user.username,
    bio: user.bio,
    image: user.image,
    following: follows,
  };
  return userView;
}
