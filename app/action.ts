import { db, eq, and, arrayOverlaps, count } from "@/db";
import { posts as postsTable, Posts } from "@/db/schema/posts";
import { users as usersTable } from "@/db/schema/users";
import { media as mediaTable } from "@/db/schema/media";
import { likes as likesTable } from "@/db/schema/likes";
import { saved as savedTable } from "@/db/schema/saved";
import { NextRequest, NextResponse } from "next/server";
import data from "@/components/utility/data";
import PostContent from "@/components/utility/PostContent";
import { use } from "react";

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

export async function testing(query: string) {
    const queryArray = query
        ? query.split(" ").map((tag) => tag.trim().toLowerCase())
        : [];
    console.log(queryArray);
    const result = await db
        .select()
        .from(postsTable)
        .where(arrayOverlaps(postsTable.tags, queryArray || ["security"]))
        .innerJoin(mediaTable, eq(mediaTable.id, postsTable.mediaId))
        .innerJoin(usersTable, eq(usersTable.id, postsTable.userId));
    return result;
}

export async function getUserData({ username }: { username: string }) {
    if (!username) {
        return { error: "Username is required", status: 404 };
    }
    try {
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

export async function getPostData({ id }: { id: number }) {
    if (!id) {
        return { error: "id is required", status: 404 };
    }
    try {
        console.log("here1");
        const userQuery = await db
            .select()
            .from(postsTable)
            .innerJoin(mediaTable, eq(postsTable.mediaId, mediaTable.id))
            .innerJoin(usersTable, eq(postsTable.userId, usersTable.id))
            .where(eq(postsTable.id, id));
        console.log("use data from new method: ", userQuery);
        return {
            userQuery,
            found: true,
        };
    } catch (error) {
        console.error(error);
        return { error: "User not found", found: false, status: 404 };
    }
}
export async function getLikeStatus({
    id,
    userId,
}: {
    id: number;
    userId: string | undefined;
}) {
    if (!id) {
        return { error: "id is required", status: 404 };
    }
    const passId: any = userId;
    try {
        const userQuery = await db
            .select({ count: count() })
            .from(likesTable)
            .innerJoin(postsTable, eq(postsTable.id, likesTable.postId))
            .innerJoin(usersTable, eq(usersTable.id, passId))
            .where(eq(postsTable.id, id));
        console.log("like data from new method: ", userQuery);
        const found = userQuery[0].count > 0 ? true : false;
        return {
            found,
        };
    } catch (error) {
        console.error(error);
        return { error: "User not found", found: false, status: 404 };
    }
}
export async function getSavedStatus({
    id,
    userId,
}: {
    id: number;
    userId: string;
}) {
    if (!id) {
        return { error: "id is required", status: 404 };
    }
    try {
        const userQuery = await db
            .select({ count: count() })
            .from(savedTable)
            .innerJoin(postsTable, eq(postsTable.id, savedTable.postId))
            .innerJoin(usersTable, eq(usersTable.id, userId))
            .where(eq(postsTable.id, id));
        console.log("like data from new method: ", userQuery);
        const found = userQuery[0].count > 0 ? true : false;
        return {
            found,
        };
    } catch (error) {
        console.error(error);
        return { error: "User not found", found: false, status: 404 };
    }
}

export async function getExplorePostData({ id }: { id: number }) {
    if (!id) {
        return { error: "id is required", status: 404 };
    }
    try {
        const result = await db
            .select()
            .from(postsTable)
            .innerJoin(mediaTable, eq(mediaTable.id, postsTable.mediaId))
            .innerJoin(usersTable, eq(postsTable.userId, usersTable.id))
            .where(eq(postsTable.id, id));
        return {
            result,
        };
    } catch (error) {
        console.error(error);
        return { error: "Post not found", found: false, status: 404 };
    }
}
