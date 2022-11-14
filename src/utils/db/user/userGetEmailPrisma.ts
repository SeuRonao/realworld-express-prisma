import prisma from "../prisma";

export default async function userGetEmailPrisma(email: string) {
  if (!email) return null;
  const user = await prisma.user.findUnique({
    where: { email },
    include: {
      follows: true,
      followedBy: true,
      authored: true,
      favorites: true,
    },
  });
  return user;
}
