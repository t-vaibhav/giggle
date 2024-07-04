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

export const likes = pgTable("likes", {
    id: serial("id").primaryKey(),
    userId: text("user_id")
        .notNull()
        .references(() => users.id),
    postId: integer("post_id")
        .notNull()
        .references(() => posts.id),
    createdAt: timestamp("created_at", { withTimezone: true })
        .notNull()
        .defaultNow(),
});

export type Likes = typeof likes.$inferSelect;
export type NewLikes = typeof likes.$inferInsert;
