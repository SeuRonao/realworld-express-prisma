import { Request, Response } from "express";
import prisma from "../../utils/db/prisma";
import tagViewer from "../../view/tagViewer";

export default async function getTags(_req: Request, res: Response) {
  const tags = await prisma.tag.findMany();
  const tagsView = tags.map((tag) => tagViewer(tag));
  return res.json({ tags: tagsView });
}
