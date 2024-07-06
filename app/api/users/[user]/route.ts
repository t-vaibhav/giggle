import { NextRequest, NextResponse } from "next/server";
import { db, eq } from "@/db";
import { users as userTable } from "@/db/schema/users";
import { getProfileData, getSavedPosts } from "@/app/action";

export async function POST(req: NextRequest) {
    const { pathname } = new URL(req.url);
    const username = pathname.split("/").pop();
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
        const profileData = await getProfileData({ id: user.id });
        const savedPosts = await getSavedPosts({ id: user.id });

        return NextResponse.json({
            user,
            profileData,
            savedPosts,
            found: true,
            haa: "yhi se hai",
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

// import { NextRequest, NextResponse } from "next/server";
// import { db, eq } from "@/db";
// import { users as userTable } from "@/db/schema/users";
// import { getProfileData, getSavedPosts, getUserData } from "@/app/action";

// export async function POST(req: NextRequest) {
//     const { pathname } = new URL(req.url);
//     const username: string | undefined = pathname.split("/").pop();
//     const data = getUserData({ username: username });
//     return data;
// }
