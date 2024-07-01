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
    // const view = <div className="w-[200px]"></div>;
    const [view, setView] = useState("none");
    function setMode(view: string) {
        setView((prev) => {
            if (view === prev) {
                return "none";
            } else {
                return view;
            }
        });
    }

    const notification = (
        <div
            className={`w-[300px] fixed py-5 top-16 right-1 bottom-2 rounded-md bg-white border shadow-md px-2 duration-200 
            ${
                view === "notification"
                    ? " translate-x-0"
                    : " translate-x-[150vw]"
            }
          `}
        >
            <div className="relative">
                <h3 className="text-center text-xl">Notifications</h3>
                <div className="h-[100px] w-[100px] mx-auto pt-5">
                    <Image
                        src={"/notification.png"}
                        height={100}
                        width={200}
                        alt="bell"
                        className="mx-auto"
                    />
                </div>
                <div className="space-y-3 mt-10">
                    <h3 className="text-xl font-normal text-center">
                        Nothing to see here yet!
                    </h3>
                    <h4 className="text-sm text-center">
                        Try exploring your home feed, creating a board or
                        following someone with ideas that inspire you.
                    </h4>
                </div>
                <X
                    className="absolute -top-3 right-0 cursor-pointer hover:text-destructive text-xs duration-100"
                    onClick={() => {
                        setMode("none");
                    }}
                />
            </div>
        </div>
    );

    const messages = (
        <div
            className={`w-[300px] fixed py-5 top-16 right-1 bottom-2 rounded-md bg-white border shadow-md px-2 duration-200
            ${view === "messages" ? " translate-x-0" : " translate-x-[150vw]"}
          `}
        >
            <div className="relative">
                <h3 className="text-center text-xl">Inbox</h3>
                <input
                    type="text"
                    className="w-full border rounded-full p-2 focus:outline-none outline-none placeholder:text-gray-600 placeholder:text-sm pl-3 text-black my-2 "
                    placeholder="Search by name or email address"
                />

                <div className="space-y-3 pt-3 max-h-full overflow-y-auto">
                    <div className="h-[50px] cursor-pointer flex items-center px-2 rounded-md hover:bg-gray-100">
                        <div className="h-[40px] w-[40px] flex items-center justify-center">
                            <Image
                                src={"/dog.jpg"}
                                height={40}
                                width={40}
                                alt="cat"
                                className="rounded-full h-full w-full object-cover border "
                            />
                        </div>
                        <div className="pl-2">
                            <h4 className="text-sm font-semibold">
                                Aman Sharma
                            </h4>
                            <h4 className="text-sm">
                                Hello, how was your day?
                            </h4>
                        </div>
                    </div>
                    <div className="h-[50px] cursor-pointer flex items-center px-2 rounded-md hover:bg-gray-100">
                        <div className="h-[40px] w-[40px] flex items-center justify-center">
                            <Image
                                src={"/dog.jpg"}
                                height={40}
                                width={40}
                                alt="cat"
                                className="rounded-full h-full w-full object-cover border "
                            />
                        </div>
                        <div className="pl-2">
                            <h4 className="text-sm font-semibold">
                                Aman Sharma
                            </h4>
                            <h4 className="text-sm">
                                Hello, how was your day?
                            </h4>
                        </div>
                    </div>
                    <div className="h-[50px] cursor-pointer flex items-center px-2 rounded-md hover:bg-gray-100">
                        <div className="h-[40px] w-[40px] flex items-center justify-center">
                            <Image
                                src={"/dog.jpg"}
                                height={40}
                                width={40}
                                alt="cat"
                                className="rounded-full h-full w-full object-cover border "
                            />
                        </div>
                        <div className="pl-2">
                            <h4 className="text-sm font-semibold">
                                Aman Sharma
                            </h4>
                            <h4 className="text-sm">
                                Hello, how was your day?
                            </h4>
                        </div>
                    </div>
                    <div className="h-[50px] cursor-pointer flex items-center px-2 rounded-md hover:bg-gray-100">
                        <div className="h-[40px] w-[40px] flex items-center justify-center">
                            <Image
                                src={"/dog.jpg"}
                                height={40}
                                width={40}
                                alt="cat"
                                className="rounded-full h-full w-full object-cover border "
                            />
                        </div>
                        <div className="pl-2">
                            <h4 className="text-sm font-semibold">
                                Aman Sharma
                            </h4>
                            <h4 className="text-sm">
                                Hello, how was your day?
                            </h4>
                        </div>
                    </div>
                    <div className="h-[50px] cursor-pointer flex items-center px-2 rounded-md hover:bg-gray-100">
                        <div className="h-[40px] w-[40px] flex items-center justify-center">
                            <Image
                                src={"/dog.jpg"}
                                height={40}
                                width={40}
                                alt="cat"
                                className="rounded-full h-full w-full object-cover border "
                            />
                        </div>
                        <div className="pl-2">
                            <h4 className="text-sm font-semibold">
                                Aman Sharma
                            </h4>
                            <h4 className="text-sm">
                                Hello, how was your day?
                            </h4>
                        </div>
                    </div>
                    <div className="h-[50px] cursor-pointer flex items-center px-2 rounded-md hover:bg-gray-100">
                        <div className="h-[40px] w-[40px] flex items-center justify-center">
                            <Image
                                src={"/dog.jpg"}
                                height={40}
                                width={40}
                                alt="cat"
                                className="rounded-full h-full w-full object-cover border "
                            />
                        </div>
                        <div className="pl-2">
                            <h4 className="text-sm font-semibold">
                                Aman Sharma
                            </h4>
                            <h4 className="text-sm">
                                Hello, how was your day?
                            </h4>
                        </div>
                    </div>
                </div>
                <X
                    className="absolute -top-3 right-0 cursor-pointer hover:text-destructive text-xs duration-100"
                    onClick={() => {
                        setMode("none");
                    }}
                />
            </div>
        </div>
    );

    return (
        <div className="h-16 flex justify-between bg-primary-foreground items-center px-20  shadow-sm space-x-8 border-b-2 fixed top-0 left-0 right-0 z-50">
            <div className="cursor-pointer">
                <Link href={"/"}>
                    <Image
                        src={"/gg.png"}
                        height={45}
                        width={45}
                        alt="Giphers"
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
                <Bell
                    className="text-black cursor-pointer  hover:text-primary "
                    onClick={() => {
                        setMode("notification");
                    }}
                />
                <MessageCircleMore
                    className="text-black cursor-pointer   hover:text-primary "
                    onClick={() => {
                        setMode("messages");
                    }}
                />

                {/* <Link
                    className="btn text-black rounded-full px-3 py-2 border border- shadow-sm"
                    href="/sign-in"
                >
                    Sign In
                </Link> */}
                <LoginButton />
                {/* <Link
                    className="btn bg-primary text-primary-foreground  rounded-full px-3 py-2 hover:bg-primary/90 shadow-md"
                    href="/sign-up"
                >
                    Sign Up
                </Link> */}

                {/* side notification bar */}
                {notification}
                {messages}
            </div>
        </div>
    );
}

// w-[300px] fixed py-5 top-16 right-1 bottom-2 rounded-md bg-white border shadow-md px-2
