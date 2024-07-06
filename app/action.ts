'use server';
import { db, eq } from "@/db";
import { posts as postsTable } from "@/db/schema/posts";
import { users as usersTable } from "@/db/schema/users";
import { media as mediaTable } from "@/db/schema/media";

export async function getPost() {
    const result = await db
        .select()
        .from(postsTable)
        .innerJoin(usersTable, eq(usersTable.id, postsTable.userId))
        .innerJoin(mediaTable, eq(mediaTable.id, postsTable.mediaId));
    return result;
}
