//components\search.tsx
"use client";

import { SearchIcon } from "lucide-react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce"; //npm i use-debounce https://www.npmjs.com/package/use-debounce

const Search = () => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleSearch = useDebouncedCallback((term: string) => {
        console.log(term);
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set("query", term);
        } else {
            params.delete("query");
        }
        replace(`${pathname}?${params.toString()}`);
    }, 300);

    return (
        <>
            <div className="basis-auto grow shrink relative flex flex-1 my-5">
                <input
                    type="text"
                    className="w-full border rounded-full p-2 focus:outline-none outline-none placeholder:text-gray-600 pl-11 text-black text-center"
                    placeholder="Search your GIFs"
                    onChange={(e) => handleSearch(e.target.value)}
                    defaultValue={searchParams.get("query")?.toString()}
                />
                <div className="absolute left-0 top-0 bottom-0 flex items-center ml-3">
                    <SearchIcon
                        className="text-primary cursor-pointer font-bold text-lg"
                        strokeWidth={3}
                    />
                </div>
            </div>
        </>
    );
};

export default Search;
