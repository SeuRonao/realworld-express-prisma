import { User } from "@prisma/client";

type UserWithFollow = User & { followedBy: User[] };

export default function profileViewer(
  user: UserWithFollow,
  currentUser?: User
) {
  const follows = currentUser
    ? Boolean(
        user.followedBy.find((value) => value.username == currentUser.username)
      )
    : false;
  const userView = {
    username: user.username,
    bio: user.bio,
    image: user.image,
    following: follows,
  };
  return userView;
}
