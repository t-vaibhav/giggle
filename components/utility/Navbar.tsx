"use client";
import {
    Bell,
    MessageCircleMore,
    MessageCircleMoreIcon,
    MessageCircleX,
    Search,
    View,
    X,
    Menu,
    XIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import LoginButton from "./LoginButton";
import { useRouter } from "next/navigation";

interface Props {
    showSearchBar?: boolean;
}

export default function Navbar({ showSearchBar = true }: Props) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const router = useRouter();
    const handleClick = () => {
        setTimeout(() => {
            router.push("/search");
        }, 200);
    };
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    return (
        <div className="h-16 flex justify-between bg-primary-foreground items-center xl:px-16 lg:px-10 px-5 2xl:px-20  shadow-sm sm:space-x-8 border-b-2 fixed top-0 left-0 right-0 z-50">
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
            <div className="hidden sm:flex">
                <ul className="flex items-center space-x-2 cursor-pointer">
                    <Link href="/">
                        <li className="hover:bg-primary hover:py-1 px-3 hover:text-primary-foreground rounded-3xl">
                            Home
                        </li>
                    </Link>
                    <Link href="/create">
                        <li className="hover:bg-primary hover:py-1 px-3 hover:text-primary-foreground rounded-3xl">
                            Create
                        </li>
                    </Link>
                </ul>
            </div>
            {showSearchBar && (
                <div
                    className="basis-auto grow shrink relative hidden sm:block"
                    onClick={handleClick}
                >
                    <input
                        type="text"
                        className="w-full border rounded-full p-2 focus:outline-none outline-none placeholder:text-gray-600 pl-11 text-black"
                        placeholder="Search templates e.g. cricket"
                        onClick={handleClick}
                    />
                    <div className="absolute left-0 top-0 bottom-0 flex items-center ml-3">
                        <Search
                            className="text-primary cursor-pointer font-bold text-lg"
                            strokeWidth={3}
                            onClick={handleClick}
                        />
                    </div>
                </div>
            )}
            <div className="sm:flex hidden items-center space-x-8">
                <LoginButton />
            </div>
            <div
                className={`sm:hidden flex items-center space-x-5 z-[100] ${
                    isMenuOpen ? "text-secondary" : "text-primary"
                }`}
            >
                {showSearchBar && (
                    <Search
                        className="cursor-pointer font-bold text-lg"
                        strokeWidth={3}
                        onClick={() => {
                            toggleMenu();
                            handleClick();
                        }}
                    />
                )}

                {!isMenuOpen ? (
                    <Menu
                        className=" cursor-pointer font-bold text-lg"
                        strokeWidth={3}
                        onClick={toggleMenu}
                    />
                ) : (
                    <XIcon
                        className=" cursor-pointer font-bold text-lg"
                        strokeWidth={3}
                        onClick={toggleMenu}
                    />
                )}
            </div>

            <div
                className={`h-[120vh] w-[100vw] duration-1000 bg-black/70 flex justify-center -z-20 top-0 left-0 right-0 fixed py-20 ease-in-out ${
                    isMenuOpen ? "block translate-x-0" : " -translate-x-[150vw]"
                }`}
            >
                <ul className="flex flex-col items-center space-y-5 cursor-pointer p-5 text-white text-lg">
                    <Link href="/" onClick={toggleMenu}>
                        <li className="">Home</li>
                    </Link>
                    <Link href="/create" onClick={toggleMenu}>
                        <li className=" rounded-3xl">Create</li>
                    </Link>
                </ul>
            </div>
        </div>
    );
}
