import { db } from "@/db";
import { media } from "@/db/schema/media";
import { eq } from "drizzle-orm";

export async function POST(request: Request) {
    const data = await request.json();
    const [result] = await db
        .insert(media)
        .values(data)
        .returning({ id: media.id });

    return new Response(JSON.stringify(result), {
        status: 200,
        headers: {
            "Content-Type": "application/json",
        },
    });
}
