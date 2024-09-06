import generateID from "../utils/generateID";

type CreateLinkBody = {
  url: string;
};

type CreateLinkResponse = {
  shortID: string;
};

export default defineEventHandler<
  { body: CreateLinkBody },
  Promise<CreateLinkResponse>
>(async (event) => {
  const { url } = await readBody(event);
  const shortID = generateID();
  const { title, description, image } = await getMeta(url);

  try {
    await db.insert(schema.links).values({
      url,
      code: shortID,
      userId: 1,
      title,
      description,
      image,
    });
  } catch (e) {
    console.error(e);
    throw createError({
      statusCode: 500,
      message: "Failed to create link",
    });
  }

  return { shortID };
});
