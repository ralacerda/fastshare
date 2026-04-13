import { text, sqliteTable, integer, index } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const users = sqliteTable(
  "users",
  {
    id: integer().primaryKey(),
    sub: text().notNull().unique(),
    fullName: text().notNull(),
    email: text().notNull().unique().notNull(),
    createAt: integer({ mode: "timestamp" }).default(sql`(unixepoch())`),
  },
  (t) => [index("sub_idx").on(t.sub)],
);

export const links = sqliteTable(
  "link",
  {
    id: integer().primaryKey(),
    url: text().notNull(),
    code: text().notNull().unique(),
    createAt: integer({ mode: "timestamp" }).default(sql`(unixepoch())`),
    image: text(),
    title: text(),
    description: text(),
    userId: integer().references(() => users.id),
  },
  (t) => [index("code_idx").on(t.code)],
);

export type Link = typeof links.$inferSelect;
