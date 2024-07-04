import { db } from "@/db";
import { likes } from "@/db/schema/likes";

export async function POST(request: Request) {
    const data = await request.json();
    const result = await db.insert(likes).values(data);
    return new Response(JSON.stringify(result), {
        status: 200,
        headers: {
            "Content-Type": "application/json",
        },
    });
}
