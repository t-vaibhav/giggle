import { db, eq, and } from "@/db";
import { posts as postsTable } from "@/db/schema/posts";
import { users as usersTable } from "@/db/schema/users";
import { media as mediaTable } from "@/db/schema/media";
import { likes as likesTable } from "@/db/schema/likes";
import { saved as savedTable } from "@/db/schema/saved";

export async function POST(request: Request) {
    const data = await request.json();
    console.log("sent data:", data);
    const result = await db
        .select()
        .from(postsTable)
        .innerJoin(mediaTable, eq(mediaTable.id, postsTable.mediaId))
        .innerJoin(usersTable, eq(postsTable.userId, usersTable.id))
        .where(eq(postsTable.id, data.id));

    return new Response(JSON.stringify(result), {
        status: 200,
        headers: {
            "Content-Type": "application/json",
        },
    });
}
