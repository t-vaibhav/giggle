import { useSession, signIn, signOut } from "next-auth/react";
import type { Session } from "next-auth";
import { Button } from "../ui/button";
import Image from "next/image";
import { LogOutIcon } from "lucide-react";
import { useEffect } from "react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import Link from "next/link";

export default function LoginButton() {
    const { data: session } = useSession() as { data: Session | null };

    useEffect(() => {
        console.log(session);
    }, [session]);
    if (session) {
        return (
            <>
                <Popover>
                    <PopoverTrigger>
                        <div className="border rounded-full shadow-lg">
                            <Image
                                height={40}
                                width={40}
                                src={"https://github.com/shadcn.png"}
                                alt="user"
                                className="rounded-full h-10 w-10 border"
                            />
                        </div>
                    </PopoverTrigger>
                    <PopoverContent className="p-0 w-fit" align="end">
                        <div className="p-3 border shadow-lg rounded-md inline-block space-y-4 min-w-60">
                            <div>
                                <Link href={"/profile"}>
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
                                        <p>{session.user?.name}</p>
                                    </div>
                                </Link>
                            </div>
                            <div
                                className="flex items-center space-x-3 text-red-400 cursor-pointer"
                                onClick={() => signOut()}
                            >
                                <LogOutIcon className="h-8 w-8 p-1 rounded-full border" />{" "}
                                <p>Log Out</p>
                            </div>
                        </div>
                    </PopoverContent>
                </Popover>
            </>
        );
    }

    return (
        <>
            <Button onClick={() => signIn()}>Sign In</Button>
        </>
    );
}
