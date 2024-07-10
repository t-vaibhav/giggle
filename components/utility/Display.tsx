"use client";
import { useSession } from "next-auth/react";
import React from "react";
import Profile from "@/components/utility/Profile";
import Profile1 from "@/components/utility/Profile1";

export default function Display({ userData, user }: any) {
    const { data: session } = useSession();

    return (
        <div>
            {session?.user?.name === user ? (
                <div className="pt-24">
                    <Profile userData={userData} />
                </div>
            ) : (
                <div className="pt-24">
                    <Profile1 userData={userData} />
                </div>
            )}
        </div>
    );
}
