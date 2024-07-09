import { testing } from "@/app/action";
import Image from "next/image";
import Link from "next/link";
import SearchCard from "./SearchCard";

const TableData = async ({ query }: { query: string }) => {
    const data = await testing(query);
    console.log("this is", data);

    return (
        <>
            <div className="columns-5">
                {data.map((item, index) => (
                    <div key={index} className="mb-10">
                        <SearchCard parameter={item} />
                    </div>
                ))}
            </div>
        </>
    );
};

export default TableData;
