import prisma from "../prisma";

export default async function tagsCreatePrisma(tags: Array<string>) {
  const createdTags = [];
  for (const tag of tags) {
    createdTags.push(
      await prisma.tag.upsert({
        create: { tagName: tag },
        where: { tagName: tag },
        update: {},
      })
    );
  }
  return createdTags;
}
