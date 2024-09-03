import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./drizzle/schema.ts",
  out: "./drizzle/migrations",
  dialect: "sqlite",
  verbose: true,
  dbCredentials: {
    url: process.env.NUXT_TURSO_URL!,
    authToken: process.env.NUXT_TURSO_TOKEN!,
  },
});
