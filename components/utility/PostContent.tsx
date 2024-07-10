"use client";
import { Heart } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { useSession } from "next-auth/react";
import DownloadButton from "./DownloadButton";
import extractFileExtension from "@/utils/extractFileExtension";
import { useRouter } from "next/navigation";

export default function PostContent({ data }: any) {
    const [liked, setLiked] = useState(false);
    const [saved, setSaved] = useState(false);
    const { data: session } = useSession();
    const ses = useSession();
    const router = useRouter();

    async function fetchLikeStatus() {
        if (!session?.user) {
            return {
                count: 0,
            };
        }
        const likeData = {
            userId: session?.user?.id,
            postId: data[0].posts.id,
        };
        const response = await fetch("/api/like-status", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(likeData),
        });
        const result = await response.json();
        return result;
    }

    async function uploadLike() {
        const likeData = {
            userId: session?.user?.id,
            postId: data[0].posts.id,
        };
        const endpoint = liked ? "/api/unlike-post" : "/api/like-post";
        const likeResponse = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(likeData),
        });
        const result = await likeResponse.json();
        console.log("likedResult: ", result);
        if (likeResponse.status === 200) {
            const likesFlag = await fetchLikeStatus();
            setLiked(likesFlag.count);
        }
    }

    async function fetchSaveStatus() {
        if (!session?.user) {
            return {
                count: 0,
            };
        }
        const saveData = {
            userId: session?.user?.id,
            postId: data[0].posts.id,
        };
        const response = await fetch("/api/save-status", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(saveData),
        });
        const result = await response.json();
        return result;
    }

    async function uploadSave() {
        const saveData = {
            userId: session?.user?.id,
            postId: data[0].posts.id,
        };
        const endpoint = saved ? "/api/unsave-post" : "/api/save-post";
        const saveResponse = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(saveData),
        });
        const result = await saveResponse.json();
        console.log("savedResult: ", result);
        if (saveResponse.status === 200) {
            const saveFlag = await fetchSaveStatus();
            setSaved(saveFlag.count);
        }
    }

    const handleLikes = () => {
        if (ses.status === "unauthenticated") {
            router.push("/please-login");
        } else {
            setLiked(!liked);
            uploadLike();
        }
    };

    const handleSave = () => {
        if (ses.status === "unauthenticated") {
            router.push("/please-login");
        } else {
            setSaved(!saved);
            uploadSave();
        }
    };
    // console.log("Dasdad", data);
    console.log(data);
    const typeOfMedia = data[0].media.type.startsWith("image/")
        ? "image"
        : "video";
    useEffect(() => {
        (async () => {
            const likesFlag = await fetchLikeStatus();
            setLiked(likesFlag.count);
            const saveFlag = await fetchSaveStatus();
            setSaved(saveFlag.count);
        })();
    });
    let fileName = "giggle_file.";
    fileName += extractFileExtension(data[0]?.media.url);
    return (
        <div className="pt-20">
            <div className=" max-w-screen-lg mx-auto shadow-2xl min-h-[80vh] rounded-2xl flex bg-white">
                <div className="w-full min-h-full bg-black rounded-l-2xl">
                    <>
                        {typeOfMedia === "image" ? (
                            <Image
                                src={data[0].media.url || "/07.gif"}
                                alt="media"
                                height={700}
                                width={400}
                                className="object-cover h-full w-full rounded-l-2xl"
                            />
                        ) : (
                            <video
                                src={data[0].media.url || "/07.gif"}
                                className="rounded-xl object-cover min-h-[80vh] mx-auto"
                                controls
                                autoPlay
                                loop
                            />
                        )}
                    </>
                </div>
                <div className="w-full p-5 min-h-full  relative ">
                    <div className="max-h-[80vh] overflow-y-auto">
                        <h3 className="text-3xl font-semibold mb-3">
                            {data[0].posts.title}
                        </h3>
                        <p className="text-base text-gray-700 overflow-auto">
                            {data[0].posts.content}
                        </p>
                    </div>
                    <div className="flex justify-between absolute bottom-5 left-5 right-5 bg-white ">
                        <div className="flex ">
                            <div className="flex gap-6 text-red-600 items-center justify-between w-full">
                                <div className="flex space-x-2">
                                    <Heart
                                        className={`${
                                            liked ? "fill-red-500" : ""
                                        } duration-150 cursor-pointer h-8 w-8 hover:scale-110 `}
                                        onClick={handleLikes}
                                    />
                                    <div className=" hover:scale-110 duration-150">
                                        <DownloadButton
                                            url={data[0]?.media.url}
                                            name={fileName}
                                            dark
                                        />
                                    </div>
                                </div>
                                {saved ? (
                                    <Button
                                        variant={"outline"}
                                        onClick={handleSave}
                                        className=""
                                    >
                                        Saved
                                    </Button>
                                ) : (
                                    <Button onClick={handleSave} className="">
                                        Save
                                    </Button>
                                )}
                            </div>
                        </div>
                        <div className="flex gap-4 text-black items-center">
                            <p className="text-lg">
                                by{" "}
                                <span className="hover:underline duration-100 cursor-pointer underline-offset-1">
                                    <Link
                                        href={`/${data[0].user?.name}` || "/"}
                                        target="_blank"
                                    >
                                        {data[0].user.name}
                                    </Link>
                                </span>
                            </p>
                            <Link href={"/profile"}>
                                <Image
                                    height={40}
                                    width={40}
                                    src={
                                        data[0].user.image ||
                                        "https://files.edgestore.dev/a9niqqui7m8monub/publicFiles/_public/80708256-2cb5-4e52-b3ef-5ae38f39ec35.jpg"
                                    }
                                    alt="user"
                                    className="rounded-full h-10 w-10 border"
                                    loading="lazy"
                                />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
