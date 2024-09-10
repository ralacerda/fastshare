import { text, sqliteTable, integer, index } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const users = sqliteTable(
  "users",
  {
    id: integer("id").primaryKey(),
    sub: text("sub").notNull().unique(),
    fullName: text("full_name").notNull(),
    email: text("email").notNull().unique().notNull(),
    createAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
  },
  (t) => ({
    subIdx: index("sub_idx").on(t.sub),
  })
);

export const links = sqliteTable(
  "link",
  {
    id: integer("id").primaryKey(),
    url: text("url").notNull(),
    code: text("code").notNull().unique(),
    createAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
    image: text("image"),
    title: text("title"),
    description: text("description"),
    userId: integer("user_id")
      .notNull()
      .references(() => users.id),
  },
  (t) => ({
    codeIdx: index("code_idx").on(t.code),
  })
);

export type Link = typeof links.$inferSelect;
