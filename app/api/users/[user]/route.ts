import { NextRequest, NextResponse } from "next/server";
import { db, eq } from "@/db";
import { users as userTable } from "@/db/schema/users";

export async function POST(req: NextRequest) {
    const { pathname } = new URL(req.url);
    const username = pathname.split("/").pop(); // Extracts the username from the URL

    if (!username) {
        return NextResponse.json(
            { error: "Username is required" },
            { status: 400 }
        );
    }

    try {
        const userQuery = await db
            .select()
            .from(userTable)
            .where(eq(userTable.name, username));

        const user = userQuery[0];

        if (!user) {
            return NextResponse.json(
                { error: "User not found", found: false },
                { status: 404 }
            );
        }

        const userId = {
            id: user.id,
        };
        const baseUrl = process.env.BASE_URL || "http://localhost:3000";
        const profileResponse = await fetch(`${baseUrl}/api/get-profile-data`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userId),
        });
        const savedPostsResponse = await fetch(
            `${baseUrl}/api/get-saved-posts`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userId),
            }
        );
        const profileData = await profileResponse.json();
        const savedPosts = await savedPostsResponse.json();

        return NextResponse.json({
            user,
            profileData,
            savedPosts,
            found: true,
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
