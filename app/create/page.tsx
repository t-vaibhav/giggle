"use client";
import Navbar from "@/components/utility/Navbar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import { Upload, View } from "lucide-react";
import HomepageGifs from "@/components/utility/HomepageGifs";
import data from "@/components/utility/data";
import ProfileGifs from "@/components/utility/ProfileGifs";
import SavedGifs from "@/components/utility/SavedGifs";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [active, setActive] = useState("created");

  function selectTab(tabName: string) {
    setActive(tabName);
  }
  const created = data.createdgifs.map((item, index) => {
    return <ProfileGifs img={item.img} alt={item.alt} key={index} />;
  });

  const saved = data.savedgifs.map((item, index) => {
    return <SavedGifs img={item.img} alt={item.alt} key={index} />;
  });

  let view = active === "saved" ? saved : created;

  return (
  <div className=" gap-3 space-y-3  mt-16 pt-16">
    <div className="max-w-screen-md mx-auto grid grid-cols-12">
      <label htmlFor="upload" className="col-span-4">
        <div className="w-full h-[400px] bg-[#e8e9e8] flex items-center justify-center rounded-3xl border-2 border-gray-400 border-dashed cursor-pointer">
          <div className="">
            <Upload className="mx-auto" />
            <h1 className="px-4 text-center text-sm leading-tight pt-2">
              Choose a file or drag and drop it here
            </h1>
          </div>
        </div>
      </label>
      <input type="file" name="upload" id="upload" className="hidden" />
      <div className="col-span-8 pl-10">
        <div>
          <h6 className="text-xs">Title</h6>
          <input
            type="text"
            name=""
            id=""
            className="border-2 w-full rounded-2xl p-2 mt-1 pl-4 mb-5"
            placeholder="Add a Title"
          />
        </div>

        <div>
          <h6 className="text-xs">Description</h6>
          <textarea
            name=""
            id=""
            className="border-2 w-full rounded-2xl p-2 mt-1 pl-4 mb-5"
            placeholder="Add a Title"
          ></textarea>
        </div>
        <div>
          <h6 className="text-xs">Link</h6>
          <input
            type="text"
            name=""
            id=""
            className="border-2 w-full rounded-2xl p-2 mt-1 pl-4 mb-5"
            placeholder="Add a Title"
          />
        </div>
        <div>
          <h6 className="text-xs">Board</h6>
          <input
            type="text"
            name=""
            id=""
            className="border-2 w-full rounded-2xl p-2 mt-1 pl-4 mb-5"
            placeholder="Add a Title"
          />
        </div>
        <div className="flex justify-center">
          <Button className="">Submit</Button>
        </div>
      </div>
    </div>
  </div>
  );
}
