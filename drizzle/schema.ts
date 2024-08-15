import { text, sqliteTable, integer, index } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const users = sqliteTable(
  "users",
  {
    id: integer("id").primaryKey(),
    sub: text("sub").notNull().unique(),
    fullName: text("full_name").notNull(),
    email: text("email").notNull().unique().notNull(),
    createAt: integer("created_at", { mode: "timestamp" }).default(
      sql`CURRENT_TIMESTAMP`
    ),
  },
  (t) => ({
    subIdx: index("sub_idx").on(t.sub),
  })
);
