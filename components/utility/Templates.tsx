"use client";
import React, { Suspense, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Divide, Heart } from "lucide-react";
import { Button } from "../ui/button";
import data from "./data";
import { useSession } from "next-auth/react";
import ImageLoadingSkeleton from "./ImageLoadingSkeleton";
import DownloadButton from "./DownloadButton";
import extractFileExtension from "@/utils/extractFileExtension";
import Spinner from "./Spinner";
import { useRouter } from "next/navigation";
const Templates = ({ parameter }: any) => {
    const [loading, setLoading] = useState(true);
    const [hover, setHover] = useState(false);
    const [liked, setLiked] = useState(false);
    const [saved, setSaved] = useState(false);
    const router = useRouter();
    const { data: session } = useSession();
    const ses = useSession();
    const blurDataURL =
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wcAAgMBAWpEwv0AAAAASUVORK5CYII=";

    async function fetchLikeStatus() {
        if (!session?.user) {
            return {
                count: 0,
            };
        }
        const likeData = {
            userId: session?.user?.id,
            postId: parameter.posts.id,
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
            postId: parameter.posts.id,
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
            postId: parameter.posts.id,
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
            postId: parameter.posts.id,
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

    useEffect(() => {
        (async () => {
            const likesFlag = await fetchLikeStatus();
            setLiked(likesFlag.count);
            const saveFlag = await fetchSaveStatus();
            setSaved(saveFlag.count);
            setLoading(false);
        })();
    });

    const typeOfMedia = parameter.media.type.startsWith("image/")
        ? "image"
        : "video";
    console.log(parameter);
    let fileName = "giggle_file.";
    fileName += extractFileExtension(parameter?.media.url);
    return (
        <Suspense fallback={<Spinner />}>
            <div className="h-full">
                <div
                    className="relative"
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                >
                    {loading ? (
                        <div className="h-full w-full animate-pulse"></div>
                    ) : (
                        <>
                            {typeOfMedia === "image" ? (
                                <Image
                                    src={parameter.media.url || "/07.gif"}
                                    alt="media"
                                    height={500}
                                    width={300}
                                    className="rounded-xl"
                                    placeholder="blur"
                                    blurDataURL={blurDataURL}
                                />
                            ) : (
                                <video
                                    src={parameter.media.url || "/07.gif"}
                                    height={500}
                                    width={300}
                                    className="rounded-xl"
                                    autoPlay
                                    muted
                                    loop
                                />
                            )}
                        </>
                    )}

                    <div
                        className={`${
                            hover ? "bg-black/60" : "hidden"
                        } h-full w-full absolute duration-100 ease-in-out overflow flex flex-col justify-between top-0 left-0 right-0 bottom-0 rounded-lg p-1 sm:p-2 z-0 cursor-pointer`}
                        onClick={() =>
                            window.open(`/post/${parameter.posts?.id}` || "/")
                        }
                    >
                        <div
                            className="flex justify-end z-10 w-full"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex gap-1 sm:gap-2 text-white items-center">
                                <p className="sm:text-base text-xs ">
                                    by{" "}
                                    <span className="hover:underline duration-100 cursor-pointer underline-offset-1 z-10 sm:text-base text-xs ">
                                        <Link
                                            href={
                                                `/${parameter.user?.name}` ||
                                                "/"
                                            }
                                            target="_blank"
                                        >
                                            {parameter.user.name}
                                        </Link>
                                    </span>
                                </p>
                                <div className="z-10 sm:scale-100  min-h-6 min-w-6">
                                    <Link
                                        href={`/${parameter.user?.name}` || "/"}
                                        target="_blank"
                                    >
                                        <Image
                                            height={40}
                                            width={40}
                                            src={parameter.user.image}
                                            alt="user"
                                            className="rounded-full h-6 sm:h-8 w-6 sm:w-8 border"
                                            loading="lazy"
                                        />
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div
                            className="flex justify-end   w-full "
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex  items-center justify-between w-full">
                                <div>
                                    {saved ? (
                                        <Button
                                            variant={"outline"}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleSave();
                                            }}
                                            className="sm:scale-100 scale-75"
                                        >
                                            Saved
                                        </Button>
                                    ) : (
                                        <Button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleSave();
                                            }}
                                            className="sm:scale-100 scale-75"
                                        >
                                            Save
                                        </Button>
                                    )}
                                </div>
                                <div className="flex sm:space-x-2 items-center">
                                    <div className="duration-150 hover:scale-110 sm:scale-100 scale-75">
                                        <DownloadButton
                                            url={parameter?.media.url}
                                            name={fileName}
                                        />
                                    </div>
                                    <Heart
                                        size={32}
                                        className={`${
                                            liked
                                                ? "fill-red-500 text-red-600 "
                                                : " text-red-600"
                                        } duration-150 cursor-pointer hover:scale-110 sm:scale-100 scale-75`}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleLikes();
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Suspense>
    );
};

export default Templates;
