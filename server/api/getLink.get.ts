import * as v from "valibot";
import { eq } from "drizzle-orm";

const ParamSchema = v.object({
  shortID: v.string(),
});

export default defineEventHandler(async (event) => {
  const params = await getValidatedQuery(event, (query) =>
    v.parse(ParamSchema, query)
  );

  const [link] = await db
    .select()
    .from(schema.links)
    .where(eq(schema.links.code, params.shortID));

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
