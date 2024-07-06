import { NextApiRequest, NextApiResponse } from "next";
import { db, inArray, eq } from "@/db";
import { posts as postsTable } from "@/db/schema/posts";
// Initialize drizzle with the PostgreSQL connect

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "GET") {
        const { query } = req.query;
        if (typeof query !== "string") {
            return res.status(400).json({
                error: "Query parameter is required and should be a string.",
            });
        }

        try {
            const result = await db
                .select()
                .from(postsTable)
                .where(inArray(query, postsTable.tags));
            res.status(200).json(result);
        } catch (error) {
            console.error("Error fetching posts:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    } else {
        res.setHeader("Allow", ["GET"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
