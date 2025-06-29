import * as v from "valibot";
import { eq, desc } from "drizzle-orm";

const ParamSchema = v.object({
  user: v.pipe(
    v.string(),
    v.transform((input) => Number.parseInt(input, 10))
  ),
});

export default defineEventHandler(async (event) => {
  const params = await getValidatedQuery(event, (query) =>
    v.parse(ParamSchema, query)
  );

  const { user } = await getUserSession(event);

  if (!user || user.id !== params.user) {
    throw createError({
      statusCode: 401,
      message: "Unauthorized",
    });
  }

  const links = await db.query.links.findMany({
    where: (links, { eq }) => eq(links.userId, params.user),
    orderBy: (links, { desc }) => desc(links.createAt),
    limit: 10,
  });

  return {
    links,
  };
});
