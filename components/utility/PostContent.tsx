import { Heart } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";

export default function PostContent() {
    const [liked, setLiked] = useState(false);
    const [saved, setSaved] = useState(false);
    const handleLikes = () => {
        setLiked(!liked);
    };

    const handleSave = () => {
        setSaved(!saved);
    };
    return (
        <div className="pt-20">
            <div className=" max-w-screen-lg mx-auto shadow-2xl min-h-[80vh] rounded-2xl flex bg-white">
                <div className="w-full min-h-full">
                    <Image
                        src="https://files.edgestore.dev/a9niqqui7m8monub/publicFiles/_public/80708256-2cb5-4e52-b3ef-5ae38f39ec35.jpg "
                        height={700}
                        width={400}
                        alt="image"
                        className="object-cover h-full w-full rounded-l-2xl"
                    />
                </div>
                <div className="w-full p-5 min-h-full  relative ">
                    <div className="max-h-[80vh] overflow-y-auto">
                        <h3 className="text-3xl font-semibold mb-3">Title</h3>
                        <p className="text-base text-gray-700 overflow-auto">
                            ipsam! Ipsum? Lorem ipsum dolor sit amet obcaecati
                            magnam ut aliquam ipsam! Ipsum? Lorem ipsum dolor
                            sit amet consectetur adipisicing elit. Animi
                            explicabo ullam veniam, tempora cum numquam debitis
                            dignissimos tenetur quia at modi veritatis itaque
                            cumque saepe fugiat odio eaque obcaecati magnam ut
                            aliquam ipsam! Ipsum? Lorem ipsum dolor sit amet
                            consectetur adipisicing
                        </p>
                    </div>
                    <div className="flex justify-between absolute bottom-5 left-5 right-5 bg-white ">
                        <div className="flex ">
                            <div className="flex gap-4 text-red-600 items-center justify-between w-full">
                                <Heart
                                    className={`${
                                        liked ? "fill-red-500" : ""
                                    } duration-150 cursor-pointer h-8 w-8`}
                                    onClick={handleLikes}
                                />
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
                                    t-vaibhav
                                </span>
                            </p>
                            <Link href={"/profile"}>
                                <Image
                                    height={40}
                                    width={40}
                                    src="https://files.edgestore.dev/a9niqqui7m8monub/publicFiles/_public/80708256-2cb5-4e52-b3ef-5ae38f39ec35.jpg"
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
