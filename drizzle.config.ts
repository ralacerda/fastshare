import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./drizzle/schema.ts",
  out: "./drizzle/migrations",
  dialect: "sqlite",
  verbose: true,
  casing: "snake_case",
  dbCredentials: {
    url: "file:database/db.sqlite",
  },
});
