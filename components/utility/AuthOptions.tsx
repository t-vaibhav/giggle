import { LogOutIcon, User2 } from "lucide-react";
import Image from "next/image";
import React from "react";

interface LogoutPopupProps {
    name: String;
}

export default function LogoutPopup() {
    return (
        <div className="p-3 border shadow-lg rounded-md inline-block space-y-4">
            <div className="flex items-center space-x-3 ">
                <div>
                    <Image
                        height={32}
                        width={32}
                        src={"/dog.jpg "}
                        alt="user"
                        className="rounded-full h-8 w-8 border"
                    />
                </div>
                <p>Username</p>
            </div>
            <div className="flex items-center space-x-3 text-red-400">
                <LogOutIcon className="h-8 w-8 p-1 rounded-full border" />{" "}
                <p>Log Out</p>
            </div>
        </div>
    );
}
