import { db, eq, and } from "@/db";
import { likes as likesTable } from "@/db/schema/likes";

export async function POST(request: Request) {
    const data = await request.json();
    const { userId, postId } = data;

    const result = await db
        .delete(likesTable)
        .where(
            and(eq(likesTable.userId, userId), eq(likesTable.postId, postId))
        );
    return new Response(JSON.stringify(result), {
        status: 200,
        headers: {
            "Content-Type": "application/json",
        },
    });
}
