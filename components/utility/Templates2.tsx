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
import { getPostData } from "@/app/action";
import LikeButton from "./LikeButton";
const Templates2 = ({ id }: any) => {
    const [loading, setLoading] = useState(true);
    const [hover, setHover] = useState(false);
    const [liked, setLiked] = useState(false);
    const [saved, setSaved] = useState(false);
    const { data: session } = useSession();
    const postData = getPostData({ id: id });

    const typeOfMedia = id.media.type.startsWith("image/") ? "image" : "video";
    console.log(id);
    let fileName = "giggle_file.";
    fileName += extractFileExtension(id?.media.url);
    return (
        <Suspense fallback={<ImageLoadingSkeleton />}>
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
                                    src={id.media.url || "/07.gif"}
                                    alt="media"
                                    height={500}
                                    width={300}
                                    className="rounded-xl"
                                />
                            ) : (
                                <video
                                    src={id.media.url || "/07.gif"}
                                    height={500}
                                    width={300}
                                    className="rounded-xl"
                                    autoPlay
                                />
                            )}
                        </>
                    )}

                    <div
                        className={`${
                            hover ? "bg-black/60" : "hidden"
                        } h-full w-full absolute duration-100 ease-in-out overflow flex flex-col justify-between top-0 left-0 right-0 bottom-0 rounded-lg p-2 z-0 cursor-pointer`}
                        onClick={() =>
                            window.open(`/post/${id.posts?.id}` || "/")
                        }
                    >
                        <div
                            className="flex justify-end z-10 w-full"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex gap-2 text-white items-center">
                                <p>
                                    by{" "}
                                    <span className="hover:underline duration-100 cursor-pointer underline-offset-1 z-10">
                                        <Link
                                            href={`/${id.user?.name}` || "/"}
                                            target="_blank"
                                        >
                                            {id.user.name}
                                        </Link>
                                    </span>
                                </p>
                                <div className="z-10">
                                    <Link
                                        href={`/${id.user?.name}` || "/"}
                                        target="_blank"
                                    >
                                        <Image
                                            height={40}
                                            width={40}
                                            src={id.user.image}
                                            alt="user"
                                            className="rounded-full h-8 w-8 border"
                                            loading="lazy"
                                        />
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div
                            className="flex justify-end"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex  items-center justify-between w-full">
                                <div>
                                    {saved ? (
                                        <Button
                                            variant={"outline"}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                // handleSave();
                                            }}
                                        >
                                            Saved
                                        </Button>
                                    ) : (
                                        <Button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                // handleSave();
                                            }}
                                        >
                                            Save
                                        </Button>
                                    )}
                                </div>
                                <div className="flex space-x-2 items-center">
                                    <div className="duration-150 hover:scale-110">
                                        <DownloadButton
                                            url={id?.media.url}
                                            name={fileName}
                                        />
                                    </div>
                                    <LikeButton id={67} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Suspense>
    );
};

export default Templates2;
