import {
    serial,
    text,
    timestamp,
    integer,
    pgTable,
    AnyPgColumn,
} from "drizzle-orm/pg-core";
import { users } from "./users";
import { media } from "./media";
import { Tags } from "lucide-react";

export const posts = pgTable("posts", {
    id: serial("id").primaryKey(),
    userId: text("user_id")
        .notNull()
        .references(() => users.id),
    mediaId: integer("media_id").references(() => media.id),
    title: text("title").notNull(),
    content: text("content").notNull(),
    tags: text("tags").array(),
    createdAt: timestamp("created_at", { withTimezone: true })
        .notNull()
        .defaultNow(),
});

export type Posts = typeof posts.$inferSelect;
export type NewPosts = typeof posts.$inferInsert;
