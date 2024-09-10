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

  const links = await db
    .select()
    .from(schema.links)
    .orderBy(desc(schema.links.createAt))
    .where(eq(schema.links.userId, params.user))
    .limit(10);

  links.forEach(console.log);

  return {
    links,
  };
});
