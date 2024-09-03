import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import * as schema from "~~/drizzle/schema";

const { tursoToken, tursoUrl } = useRuntimeConfig();
const client = createClient({ url: tursoUrl, authToken: tursoToken });

export const db = drizzle(client, { schema });
export { schema };
