"use client";
import data from "@/components/utility/data";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import Templates from "@/components/utility/Templates";
import React from "react";

const Home: React.FC = () => {
    const [posts, setPosts] = useState<any[]>([]);

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
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <main className="pt-20 mx-11 bg-white">
            <div className="grid grid-cols-3 gap-10">
                {posts.map((post, index) => (
                    <Templates key={index} parameter={post} />
                ))}
            </div>
            <Button onClick={getData}>Get Data</Button>
        </main>
    );
};

export default Home;
