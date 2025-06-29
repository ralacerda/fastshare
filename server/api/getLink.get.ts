import * as v from "valibot";

const ParamSchema = v.object({
  shortID: v.string(),
});

export default defineEventHandler(async (event) => {
  const params = await getValidatedQuery(event, (query) =>
    v.parse(ParamSchema, query)
  );

  const link = await db.query.links.findFirst({
    where: (links, { eq }) => eq(links.code, params.shortID),
    columns: {
      url: true,
    },
  });
  if (!link) {
    throw createError({
      statusCode: 404,
      message: "Link not found",
    });
  }

  return {
    url: link.url,
  };
});
