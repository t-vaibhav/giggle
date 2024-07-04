import { and, db, eq, count } from "@/db";
import { likes as likesTable } from "@/db/schema/likes";

export async function POST(request: Request) {
    const data = await request.json();
    const { userId, postId } = data;

    const response = await db
        .select({ count: count() })
        .from(likesTable)
        .where(
            and(eq(likesTable.userId, userId), eq(likesTable.postId, postId))
        );
    console.log("count is: ", response);

    return new Response(JSON.stringify(response), {
        status: 200,
        headers: {
            "Content-Type": "application/json",
        },
    });
}
