import { and, db, eq, count } from "@/db";
import { saved as savedTable } from "@/db/schema/saved";

export async function POST(request: Request) {
    const data = await request.json();
    const { userId, postId } = data;

    const response = await db
        .select({ count: count() })
        .from(savedTable)
        .where(
            and(eq(savedTable.userId, userId), eq(savedTable.postId, postId))
        );
    console.log("count is: ", response[0].count);

    return new Response(JSON.stringify(response[0]), {
        status: 200,
        headers: {
            "Content-Type": "application/json",
        },
    });
}
