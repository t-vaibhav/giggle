import { db } from "@/db";
import { posts } from "@/db/schema/posts";

export async function POST(request: Request) {
    const data = await request.json();
    const result = await db.insert(posts).values(data);
    return new Response(JSON.stringify(result), {
        status: 200,
        headers: {
            "Content-Type": "application/json",
        },
    });
}
