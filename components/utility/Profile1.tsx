"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import Templates from "@/components/utility/Templates";
import { Button } from "../ui/button";
import Link from "next/link";

interface UserData {
    user: {
        image: string;
        name: string;
    };
    profileData: any[];
    savedPosts: any[];
}

export default function Profile1({ userData }: any) {
    const created = userData.profileData.map((item: any, index: any) => (
        <Templates key={index} parameter={item} />
    ));

    const noPostCreated = (
        <div className="flex items-center justify-center my-10">
            <div>
                <h3 className="md:text-xl text-lg lg:text-2xl font-medium pb-3">
                    You have not made any posts yet.
                </h3>
                <div>
                    <Link href={"/create"}>
                        <Button>Create your post</Button>
                    </Link>
                </div>
            </div>
        </div>
    );

    const createdRender = created.length > 0 ? created : noPostCreated;

    return (
        <div className="gap-3 space-y-3 mx-3 sm:mx-5 md:mx-10 mb-10">
            <div className="text-center">
                <Avatar className="h-20 md:h-24 lg:h-28  w-20 md:w-24 lg:w-28 mx-auto">
                    <AvatarImage src={userData.user.image} />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <h4 className="text-2xl sm:text-xl md:text-3xl lg:text-4xl font-semibold pt-5">
                    {userData.user.name}
                </h4>
                <h5 className="text-foreground text-base mt-2">
                    {userData.profileData.length}{" "}
                    {userData.profileData.length > 1 ? "Posts" : "Post"} | 20
                    Likes
                </h5>
                <div className="flex justify-center pt-3 sm:pt-5 md:pt-8">
                    <nav>
                        <ul className="flex space-x-10 cursor-pointer">
                            <li className={"border-b-black border-b-[3px]"}>
                                Created
                            </li>
                        </ul>
                    </nav>
                </div>
                <div
                    className={`mt-5 w-full md:w-[80%] lg:w-[60%] xl:w-[50%] border mx-auto ${
                        created.length > 0 ? "columns-2 sm:columns-3" : ""
                    } p-3 space-y-3 rounded-md`}
                >
                    {created.length > 0 ? created : noPostCreated}
                </div>
            </div>
        </div>
    );
}
