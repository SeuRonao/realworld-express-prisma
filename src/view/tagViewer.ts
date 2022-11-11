import { Tag } from "@prisma/client";

export default function tagViewer(tag: Tag) {
  const tagView = tag.tagName;
  return tagView;
}
