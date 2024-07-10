import { testing } from "@/app/action";
import Image from "next/image";
import Link from "next/link";
import SearchCard from "./SearchCard";

const TableData = async ({ query }: { query: string }) => {
    const data = await testing(query);
    console.log("this is", data);

    return (
        <>
            {data.length === 0 ? (
                <div className="text-center min-h-[50vh] flex items-center justify-center">
                    <p>No results found.</p>
                </div>
            ) : (
                <div className="columns-5 gap-5">
                    {data.map((item, index) => (
                        <div key={index} className="">
                            <SearchCard parameter={item} />
                        </div>
                    ))}
                </div>
            )}
        </>
    );
};

export default TableData;
