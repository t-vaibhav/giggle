"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Profile from "@/components/utility/Profile";
import LoadingScreen from "@/components/utility/LoadingScreen";

export default function Page({ params }: { params: { user: string } }) {
    const username = params.user; // Extracts the username from the URL
    const [userData, setUserData] = useState(null);
    const [found, setFound] = useState(false);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        if (!username) {
            router.push("/");
            return;
        }

        async function fetchData() {
            const data = { name: username };
            try {
                const response = await fetch(`/api/users/${username}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                });

                const result = await response.json();
                setUserData(result);
                console.log("User data: ", result);
                setFound(result.found);
                console.log(userData);

                if (!result.found) router.push("/");
            } catch (error) {
                console.error("Failed to fetch data:", error);
            }
            setLoading(false);
        }

        fetchData();
    }, [username, router]);

    return (
        <>
            {loading ? (
                <LoadingScreen />
            ) : (
                found && (
                    <div className="pt-24">
                        <Profile userData={userData} />
                        {/* {JSON.stringify(userData)} */}
                    </div>
                )
            )}
        </>
    );
}
