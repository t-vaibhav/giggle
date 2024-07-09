import Templates from "@/components/utility/Templates";
import React, { Suspense } from "react";
import { getPost, testing } from "./action";
import ImageLoadingSkeleton from "@/components/utility/ImageLoadingSkeleton";

export default async function Home() {
    const posts = await getPost();

    const test = await testing("health");
    console.log("test ka data", test);

    return (
        <main className="pt-20 bg-white">
            <div>{test.toString()}</div>
            <div className="columns-6 gap-3 space-y-3 mx-10 mt-5">
                {posts.map((post, index) => (
                    <Suspense fallback={<ImageLoadingSkeleton />} key={index}>
                        <Templates key={index} parameter={post} />
                    </Suspense>
                ))}
            </div>
        </main>
    );
}
