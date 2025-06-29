import { drizzle } from "drizzle-orm/libsql";
import * as schema from "~~/drizzle/schema";

const { devDatabase } = useRuntimeConfig();

export const db = drizzle({
  connection: devDatabase,
  casing: "snake_case",
  schema,
});

export { schema };
