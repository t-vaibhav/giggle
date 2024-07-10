"use client";
import { useSession } from "next-auth/react";

export default function getAuthData() {
    const session = useSession();
    return session.data;
}
