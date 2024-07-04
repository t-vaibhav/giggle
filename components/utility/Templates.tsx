import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { Button } from "../ui/button";
import { useSession } from "next-auth/react";
import data from "./data";

const Templates = ({ parameter }: any) => {
    const [hover, setHover] = useState(false);
    const [liked, setLiked] = useState(false);
    const [saved, setSaved] = useState(false);
    const { data: session } = useSession();

    async function fetchLikeStatus() {
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
        setLiked(!liked);
        uploadLike();
    };

    const handleSave = () => {
        setSaved(!saved);
        uploadSave();
    };

    useEffect(() => {
        if (session?.user) {
            (async () => {
                const likesFlag = await fetchLikeStatus();
                console.log(likesFlag.count);
                setLiked(likesFlag.count);
                const saveFlag = await fetchSaveStatus();
                console.log(saveFlag.count);
                setSaved(saveFlag.count);
            })();
        }
    }, [session?.user]);

    const typeOfMedia = parameter.media.type.startsWith("image/")
        ? "image"
        : "video";

    return (
        <div className="h-full">
            <div
                className="relative"
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
            >
                {typeOfMedia === "image" ? (
                    <Image
                        src={parameter.media.url || "/07.gif"}
                        alt="media"
                        height={500}
                        width={300}
                        className="rounded-xl"
                    />
                ) : (
                    <video
                        src={parameter.media.url || "/07.gif"}
                        height={500}
                        width={300}
                        className="rounded-xl"
                        controls
                    />
                )}
                <div
                    className={`${
                        hover ? "bg-black/60" : "hidden"
                    } h-full w-full absolute duration-100 ease-in-out overflow-clip flex flex-col justify-between top-0 left-0 right-0 bottom-0 rounded-lg p-2`}
                >
                    <div className="flex justify-end">
                        <div className="flex gap-2 text-white items-center">
                            <p>
                                by{" "}
                                <span className="hover:underline duration-100 cursor-pointer underline-offset-1">
                                    t-vaibhav
                                </span>
                            </p>
                            <Link href={"/profile"}>
                                <Image
                                    height={40}
                                    width={40}
                                    src={"https://github.com/shadcn.png"}
                                    alt="user"
                                    className="rounded-full h-8 w-8 border"
                                />
                            </Link>
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <div className="flex gap-2 text-red-600 items-center justify-between w-full">
                            {saved ? (
                                <Button
                                    variant={"outline"}
                                    onClick={handleSave}
                                >
                                    Saved
                                </Button>
                            ) : (
                                <Button onClick={handleSave}>Save</Button>
                            )}

                            <Heart
                                className={`${
                                    liked ? "fill-red-500" : ""
                                } duration-150 cursor-pointer`}
                                onClick={handleLikes}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Templates;
