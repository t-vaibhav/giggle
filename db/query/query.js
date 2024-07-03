import { db, eq } from "@/db";
import { posts as postsTable } from "@/db/schema/posts";
import { users as usersTable } from "@/db/schema/users";
import { media as mediaTable } from "@/db/schema/media";

const posts = await db
    .select()
    .from(postsTable)
    .innerJoin(usersTable, eq(usersTable.id, postsTable.userId))
    .leftJoin(mediaTable, eq(mediaTable.id, postsTable.mediaId));
