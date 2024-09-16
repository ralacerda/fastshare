import { drizzle } from "drizzle-orm/libsql";
import { createClient as _createClient } from "@libsql/client";
import * as schema from "~~/drizzle/schema";

const { tursoToken, tursoUrl, devDatabase } = useRuntimeConfig();

function createClient() {
  if (devDatabase === "true") {
    return _createClient({ url: "file:database/db.sqlite" });
  }
  return _createClient({ url: tursoUrl, authToken: tursoToken });
}

export const db = drizzle(createClient(), { schema });
export { schema };
