import { db } from "@/db";
import { saved } from "@/db/schema/saved";

export async function POST(request: Request) {
    const data = await request.json();
    const result = await db.insert(saved).values(data);
    return new Response(JSON.stringify(result), {
        status: 200,
        headers: {
            "Content-Type": "application/json",
        },
    });
}
