import ShortUniqueId from "short-unique-id";

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
  const uid = new ShortUniqueId({
    dictionary: "ABCDEFGHIJKLMNPQRSTUVWXYZ123456789".split(""),
  });

  const shortID = uid.fmt("$r3-$r3");
  const { url } = await readBody(event);

  try {
    await db.insert(schema.links).values({
      url,
      code: shortID,
      userId: 1,
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
