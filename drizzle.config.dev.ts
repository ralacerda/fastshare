import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./drizzle/schema.ts",
  out: "./drizzle/migrations",
  dialect: "sqlite",
  verbose: true,
  dbCredentials: {
    url: "file:database/db.sqlite",
  },
});
