"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export default function SearchCard({ parameter }: any) {
    const [loading, setLoading] = useState(true);
    const [hover, setHover] = useState(false);
    console.log("card ke andr ka: ", parameter);

    const typeOfMedia = parameter.media.type.startsWith("image/")
        ? "image"
        : "video";
    console.log(typeOfMedia);
    const router = useRouter();
    return (
        <div className="h-full">
            <div
                className="relative"
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
            >
                <>
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
                            autoPlay
                        />
                    )}
                </>

                <div
                    className={`${
                        hover ? "bg-black/30" : "hidden"
                    } h-full w-full absolute duration-100 ease-in-out flex flex-col justify-between top-0 left-0 right-0 bottom-0 rounded-lg p-2 z-0 cursor-pointer`}
                    onClick={() =>
                        window.open(`/post/${parameter.posts?.id}` || "/")
                    }
                >
                    <div
                        className="flex  z-10 w-full flex-col justify-between flex-grow flex-1"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-start justify-end">
                            <div className="flex gap-2 text-white items-start">
                                <p>
                                    by{" "}
                                    <span className="hover:underline duration-100 cursor-pointer underline-offset-1 z-10">
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
                                <div className="z-10">
                                    <Link
                                        href={`/${parameter.user?.name}` || "/"}
                                        target="_blank"
                                    >
                                        <Image
                                            height={40}
                                            width={40}
                                            src={parameter.user.image}
                                            alt="user"
                                            className="rounded-full h-8 w-8 border"
                                            loading="lazy"
                                        />
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-center items-center -translate-y-5">
                            <Button
                                className="hover:text-secondary bg-primary-foreground hover:bg-secondary-foreground text-primary"
                                onClick={() =>
                                    router.push(
                                        `/post/${parameter.posts?.id}` || "/"
                                    )
                                }
                            >
                                Open
                            </Button>
                        </div>
                        <div></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
