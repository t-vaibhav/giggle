import { db, eq, and } from "@/db";
import { saved as savedTable } from "@/db/schema/saved";

export async function POST(request: Request) {
    const data = await request.json();
    const { userId, postId } = data;

    const result = await db
        .delete(savedTable)
        .where(
            and(eq(savedTable.userId, userId), eq(savedTable.postId, postId))
        );
    return new Response(JSON.stringify(result), {
        status: 200,
        headers: {
            "Content-Type": "application/json",
        },
    });
}
