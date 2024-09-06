import * as v from "valibot";
import urlMetadata from "url-metadata";

const Result = v.object({
  title: v.optional(v.string()),
  "og:title": v.optional(v.string()),
  "og:description": v.optional(v.string()),
  description: v.optional(v.string()),
  "og:image": v.optional(v.string()),
});

export async function getMeta(url: string) {
  const meta = await urlMetadata(url);

  const {
    title,
    description,
    "og:title": ogTitle,
    "og:description": ogDescription,
    "og:image": ogImage,
  } = v.parse(Result, meta);

  return {
    title: title || ogTitle,
    description: description || ogDescription,
    image: ogImage,
  };
}
