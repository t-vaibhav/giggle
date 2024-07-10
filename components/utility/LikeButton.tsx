"use client";
import { getLikeStatus } from "@/app/action";
import { Heart } from "lucide-react";
import { useSession } from "next-auth/react";
import React, { useState } from "react";

export default function LikeButton({ id }: { id: number }) {
    const session = useSession();
    const data = getLikeStatus({ id: id, userId: session.data?.user.id });
    console.log("like ke andr, ", data);
    const [liked, setLiked] = useState(false);
    return (
        <div>
            <Heart
                size={32}
                className={`${
                    liked ? "fill-red-500 text-red-600 " : " text-red-600"
                } duration-150 cursor-pointer hover:scale-110`}
                onClick={(e) => {
                    e.stopPropagation();
                    // handleLikes();
                }}
            />
        </div>
    );
}
