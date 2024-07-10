//app\employee\page.tsx
import Link from "next/link";
import { Suspense } from "react";
import Search from "@/components/utility/Search";
import Spinner from "@/components/utility/Spinner";
import TableData from "@/components/utility/TableData";

const Home = async ({
    searchParams,
}: {
    searchParams?: {
        query?: string;
    };
}) => {
    const query = searchParams?.query || "security";
    console.log("query is here: ", query);
    return (
        <div className="max-w-screen-xl mx-auto pt-10 ">
            <Search />
            <div className="flex items-center justify-between gap-1 mb-5">
                <h1 className="text-4xl font-bold">Search results</h1>
            </div>
            <TableData query={query} />
        </div>
    );
};

export default Home;
