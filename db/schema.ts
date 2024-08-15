import { text, sqliteTable, integer, index } from "drizzle-orm/sqlite-core";

export const users = sqliteTable(
  "users",
  {
    id: integer("id").primaryKey(),
    sub: text("sub").notNull().unique(),
    fullName: text("full_name").notNull(),
    email: text("email").notNull().unique(),
  },
  (t) => ({
    subIdx: index("sub_idx").on(t.sub),
  })
);
