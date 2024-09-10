import generateID from "../utils/generateID";

import type { Link } from "~~/drizzle/schema";

type CreateLinkBody = {
  url: string;
};

type CreateLinkResponse = {
  newLink: Link;
};

export default defineEventHandler<
  { body: CreateLinkBody },
  Promise<CreateLinkResponse>
>(async (event) => {
  const { url } = await readBody(event);
  const shortID = generateID();
  const { title, description, image } = await getMeta(url);
  const { user } = await getUserSession(event);

  try {
    const [newLink] = await db
      .insert(schema.links)
      .values({
        url,
        code: shortID,
        userId: user?.id || 1,
        title,
        description,
        image,
      })
      .returning();

    return { newLink };
  } catch (e) {
    console.error(e);
    throw createError({
      statusCode: 500,
      message: "Failed to create link",
    });
  }
});
