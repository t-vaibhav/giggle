import Templates from "@/components/utility/Templates";
import React from "react";
import { getPost } from "./action";

export default async function Home() {
    const posts = await getPost();
    return (
        <main className="pt-20 bg-white">
            <div className="columns-6 gap-3 space-y-3 mx-10 mt-5">
                {posts.map((post, index) => (
                    <Templates key={index} parameter={post} />
                ))}
            </div>
        </main>
    );
};
