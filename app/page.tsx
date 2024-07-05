"use client";
import data from "@/components/utility/data";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import Templates from "@/components/utility/Templates";
import React from "react";
import LoadingScreen from "@/components/utility/LoadingScreen";

const Home: React.FC = () => {
    const [posts, setPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    async function getData() {
        try {
            const response = await fetch("/api/get-posts", {
                method: "GET",
            });
            if (response.ok) {
                const posts = await response.json();
                setPosts(posts);
            } else {
                console.error("Failed to fetch posts");
            }
        } catch (error) {
            console.error("An error occurred while fetching posts", error);
        }
        setLoading(false);
    }

    useEffect(() => {
        getData();
    }, []);

    console.log(posts);
    return (
        <>
            {loading ? (
                <LoadingScreen />
            ) : (
                <main className="pt-20 bg-white">
                    <div className="columns-6 gap-3 space-y-3 mx-10 mt-5">
                        {posts.map((post, index) => (
                            <Templates key={index} parameter={post} />
                        ))}
                    </div>
                </main>
            )}
        </>
    );
};

export default Home;
