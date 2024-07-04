import {
    serial,
    text,
    timestamp,
    integer,
    pgTable,
    AnyPgColumn,
} from "drizzle-orm/pg-core";
import { users } from "./users";
import { posts } from "./posts";

export const saved = pgTable("saved", {
    id: serial("id").primaryKey(),
    userId: text("user_id")
        .notNull()
        .references(() => users.id),
    postId: integer("post_id").references(() => posts.id),
    createdAt: timestamp("created_at", { withTimezone: true })
        .notNull()
        .defaultNow(),
});

export type Saved = typeof saved.$inferSelect;
export type NewSaved = typeof saved.$inferInsert;
