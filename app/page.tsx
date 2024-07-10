import Templates from "@/components/utility/Templates";
import React, { Suspense } from "react";
import { getLikeStatus, getPost, getPostData } from "./action";
import ImageLoadingSkeleton from "@/components/utility/ImageLoadingSkeleton";
import Spinner from "@/components/utility/Spinner";

export default async function Home() {
    const posts = await getPost();
    const postElements: any = [];
    posts.forEach((post, index) => {
        postElements.push(
            <Suspense fallback={<Spinner />} key={index}>
                <Templates key={index} parameter={post} />
            </Suspense>
        );
    });
    console.log(postElements);
    return (
        <main className="pt-20 bg-white">
            <div className="2xl:columns-6 lg:columns-5 md:columns-4 sm:columns-3 columns-2 gap-3 space-y-3 lg:mx-5 xl:mx-10 mx-2 sm:mx-5">
                {postElements ? postElements : <Spinner />}
            </div>
        </main>
    );
}
