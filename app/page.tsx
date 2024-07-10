import Templates from "@/components/utility/Templates";
import React, { Suspense } from "react";
import { getLikeStatus, getPost, getPostData } from "./action";
import ImageLoadingSkeleton from "@/components/utility/ImageLoadingSkeleton";
import Templates2 from "@/components/utility/Templates2";
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
            <div className="columns-6 gap-3 space-y-3 mx-10 mt-5">
                {postElements ? postElements : <Spinner />}
            </div>
        </main>
    );
}
