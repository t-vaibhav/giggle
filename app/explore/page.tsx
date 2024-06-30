"use client";
import Navbar from "@/components/utility/Navbar";
import TrendingCard from "@/components/utility/TrendingCard";
import data from "@/components/utility/data";

export default function Home() {
  const cards = data.exporeImages.map((item, index) => {
    return <TrendingCard img={item.img} title={item.title} key={index} />;
  });
  let dateobj = new Date();
  // const currdate =
  return (
      <div className=" gap-3 space-y-3 mx-10 mt-10 pt-16">
        <div className="text-center">
          <div className="space-y-3">
            <h4 className="text-xl font-normal">{dateobj.toDateString()}</h4>
            <h4 className="text-4xl font-normal">
              What&apos;s Trending Today?
            </h4>
          </div>
          <div className="grid grid-cols-3 gap-8 mx-20 pt-6">{cards}</div>
        </div>
      </div>
  );
}
