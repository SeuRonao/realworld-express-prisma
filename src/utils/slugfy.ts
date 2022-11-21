/**
 * Converts an input text to an uri safe string.
 * @param text text to convert to a slug
 * @returns the slug string
 */
export default function slugfy(text: string) {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
