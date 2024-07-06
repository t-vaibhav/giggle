"use client";
import {
    Bell,
    MessageCircleMore,
    MessageCircleMoreIcon,
    MessageCircleX,
    Search,
    View,
    X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import LoginButton from "./LoginButton";

export default function Navbar() {
    return (
        <div className="h-16 flex justify-between bg-primary-foreground items-center px-20  shadow-sm space-x-8 border-b-2 fixed top-0 left-0 right-0 z-50">
            <div className="cursor-pointer">
                <Link href={"/"}>
                    <Image
                        src={"/gg.png"}
                        height={45}
                        width={45}
                        alt="Giggle!"
                        className="rounded-full hover:scale-110 hover:shadow-md hover:"
                    />
                </Link>
            </div>
            <div className="">
                <ul className="flex items-center space-x-2 cursor-pointer">
                    <Link href="/">
                        <li className="hover:bg-primary hover:py-1 px-3 hover:text-primary-foreground rounded-3xl">
                            Home
                        </li>
                    </Link>
                    <Link href="/explore">
                        <li className="hover:bg-primary hover:py-1 px-3 hover:text-primary-foreground rounded-3xl">
                            Explore
                        </li>
                    </Link>
                    <Link href="/create">
                        <li className="hover:bg-primary hover:py-1 px-3 hover:text-primary-foreground rounded-3xl">
                            Create
                        </li>
                    </Link>
                </ul>
            </div>
            <div className="basis-auto grow shrink relative">
                <input
                    type="text"
                    className="w-full border rounded-full p-2 focus:outline-none outline-none placeholder:text-gray-600 pl-11 text-black "
                    placeholder="Search your GIFs"
                />
                <div className="absolute left-0 top-0 bottom-0 flex items-center ml-3">
                    <Search
                        className="text-primary cursor-pointer font-bold text-lg"
                        strokeWidth={3}
                    />
                </div>
            </div>
            <div className="flex items-center space-x-8">
                <LoginButton />
            </div>
        </div>
    );
}

// w-[300px] fixed py-5 top-16 right-1 bottom-2 rounded-md bg-white border shadow-md px-2
