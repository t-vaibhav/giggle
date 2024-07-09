import { db, eq, and, arrayContains } from "@/db";
import { posts as postsTable } from "@/db/schema/posts";
import { users as usersTable } from "@/db/schema/users";
import { media as mediaTable } from "@/db/schema/media";
import { likes as likesTable } from "@/db/schema/likes";
import { saved as savedTable } from "@/db/schema/saved";

export async function GET() {
    try {
        const result = await db
            .select()
            .from(postsTable)
            .where(arrayContains(postsTable.tags, ["a"]));

        // Assuming result is an array of posts
        return new Response(JSON.stringify(result), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        // Cast error to Error type to access message property
        const err = error as Error;
        return new Response(JSON.stringify({ error: err.message }), {
            status: 500,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }
}
