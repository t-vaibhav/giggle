"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import Templates from "@/components/utility/Templates";

export default function Profile({ userData }: any) {
    const [active, setActive] = useState("created");

    function selectTab(tabName: string) {
        setActive(tabName);
    }
    console.log("profile ke andr: ", userData.profileData);
    const created = userData.profileData.map((item: any, index: any) => {
        return <Templates key={index} parameter={item} />;
    });
    console.log("profile ke andr saved: ", userData.savedPosts);
    const saved = userData.savedPosts.map((item: any, index: any) => {
        return <Templates key={index} parameter={item} />;
    });

    let view = active === "saved" ? saved : created;

    return (
        <div className=" gap-3 space-y-3 mx-10 ">
            <div className="text-center">
                <Avatar className="h-28 w-28 mx-auto">
                    <AvatarImage src={userData.user.image} />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <h4 className="text-4xl font-semibold pt-5">
                    {userData.user.name}
                </h4>
                {/* <h6 className="text-muted-foreground text-base py-2">
                    @bewakoof_paipup
                </h6> */}
                <h5 className="text-foreground text-base mt-2">
                    36 Posts | 20 Likes
                </h5>
                {/* <div className="space-x-4 pt-3">
                    <button className="py-1 px-3 rounded-3xl bg-muted border text-black text-base ">
                        Edit Profile
                    </button>
                    <button className="py-1 px-3 rounded-3xl bg-muted border text-black text-base ">
                        Share
                    </button>
                </div> */}
                <div className="flex justify-center pt-8">
                    <nav>
                        <ul className="flex space-x-10 cursor-pointer">
                            <li
                                className={
                                    active === "created"
                                        ? "border-b-black border-b-[3px]"
                                        : ""
                                }
                                onClick={() => selectTab("created")}
                            >
                                Crafted
                            </li>

                            <li
                                className={
                                    active === "saved"
                                        ? "border-b-black border-b-[3px]"
                                        : ""
                                }
                                onClick={() => selectTab("saved")}
                            >
                                Saved
                            </li>
                        </ul>
                    </nav>
                </div>
                <div className="mt-5 w-[50%] border mx-auto columns-3 p-3 space-y-3 rounded-md">
                    {view}
                </div>
            </div>
        </div>
    );
}
