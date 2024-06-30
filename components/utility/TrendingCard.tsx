import Image from "next/image";
import { title } from "process";
import React from "react";

type TrendingCardProps = {
  img: string;
  title: string;
};

const TrendingCard: React.FC<TrendingCardProps> = ({ img, title }) => {
  return (
    <div className="h-[300px] relative cursor-pointer">
      <Image
        src={img}
        height={200}
        width={500}
        alt="holi"
        className="object-cover h-full max-w-full rounded-3xl"
      />
      <div className="hover:bg-black/40 absolute top-0 left-0 right-0 bottom-0 rounded-3xl">
        <div className="flex items-end justify-center h-full w-full opacity-0 hover:opacity-100 rounded-3xl">
          <h4 className="text-2xl pb-3 text-white">{title}</h4>
        </div>
      </div>
    </div>
  );
};

export default TrendingCard;
