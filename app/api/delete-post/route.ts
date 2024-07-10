import { NextResponse } from "next/server";
import { db, eq, and, arrayOverlaps, count } from "@/db";
import { posts as postsTable, Posts } from "@/db/schema/posts";
import { users as usersTable } from "@/db/schema/users";
import { media as mediaTable } from "@/db/schema/media";
import { likes as likesTable } from "@/db/schema/likes";
import { saved as savedTable } from "@/db/schema/saved";

export async function GET({ id }: { id: number }) {
    if (!id) {
        return { error: "id is required", status: 404 };
    }
    try {
        const result = await db
            .select()
            .from(postsTable)
            .innerJoin(mediaTable, eq(mediaTable.id, postsTable.mediaId))
            .innerJoin(savedTable, eq(postsTable.id, savedTable.postId))
            .where(eq(postsTable.id, id));
        return NextResponse.json({ result }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error }, { status: 500 });
    }
}
