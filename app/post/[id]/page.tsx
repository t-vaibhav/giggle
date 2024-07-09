"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Profile from "@/components/utility/Profile";
import LoadingScreen from "@/components/utility/LoadingScreen";
import PostContent from "@/components/utility/PostContent";

export default function Page({ params }: { params: { id: string } }) {
    const postId = params.id; // Extracts the postId from the URL
    const [found, setFound] = useState(false);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    useEffect(() => {
        if (!postId) {
            router.push("/not-found");
            return;
        }

        async function fetchData() {
            const data = { id: postId };
            try {
                const response = await fetch(`/api/explore-post`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                });

                const result = await response.json();
                setFound(result.length);
                console.log("User data: ", result);
                setData(result);
            } catch (error) {
                console.error("Failed to fetch data:", error);
            }
            setLoading(false);
        }
        fetchData();
    }, [postId, router]);
    console.log(data);

    return <>{loading ? <LoadingScreen /> : <PostContent data={data} />}</>;
}
