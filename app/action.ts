import { db, eq, and } from "@/db";
import { posts as postsTable } from "@/db/schema/posts";
import { users as usersTable } from "@/db/schema/users";
import { media as mediaTable } from "@/db/schema/media";
import { likes as likesTable } from "@/db/schema/likes";
import { saved as savedTable } from "@/db/schema/saved";
import { NextRequest, NextResponse } from "next/server";
import { error } from "console";

export async function getPost() {
    const result = await db
        .select()
        .from(postsTable)
        .innerJoin(usersTable, eq(usersTable.id, postsTable.userId))
        .innerJoin(mediaTable, eq(mediaTable.id, postsTable.mediaId));
    return result;
}

export async function getProfileData({ id }: { id: string }) {
    const result = await db
        .select()
        .from(usersTable)
        .innerJoin(postsTable, eq(postsTable.userId, id))
        .innerJoin(mediaTable, eq(mediaTable.id, postsTable.mediaId))
        .where(eq(usersTable.id, id));

    return result;
}

export async function getSavedPosts({ id }: { id: string }) {
    const result = await db
        .select()
        .from(postsTable)
        .innerJoin(mediaTable, eq(mediaTable.id, postsTable.mediaId))
        .innerJoin(savedTable, eq(savedTable.userId, id))
        .innerJoin(usersTable, eq(usersTable.id, postsTable.userId))
        .where(eq(postsTable.id, savedTable.postId));

    return result;
}

export async function getUserData({ username }: { username: string }) {
    if (!username) {
        return { error: "Username is required", status: 404 };
    }
    try {
        console.log("here1");
        const userQuery = await db
            .select()
            .from(usersTable)
            .where(eq(usersTable.name, username));
        const user = userQuery[0];
        console.log("here2");
        if (!user) {
            return { error: "User not found", found: false, status: 404 };
        }
        const profileData = await getProfileData({ id: user.id });
        const savedPosts = await getSavedPosts({ id: user.id });
        return {
            user,
            profileData,
            savedPosts,
            found: true,
        };
    } catch (error) {
        console.error(error);
        return { error: "User not found", found: false, status: 404 };
    }
}
