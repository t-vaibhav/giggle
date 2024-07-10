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
                <div className="text-center min-h-[50vh] flex items-center justify-center sm:scale-100 scale-75">
                    <Image
                        src={"/no-results.png"}
                        height={202}
                        width={200}
                        alt="not results"
                    />
                </div>
            ) : (
                <div className=" lg:columns-5 md:columns-4 sm:columns-3 columns-2 gap-3 space-y-3 lg:mx-5 xl:mx-10 mx-2 sm:mx-5">
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
