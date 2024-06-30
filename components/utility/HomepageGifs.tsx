import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CircleEllipsis, SmilePlus } from "lucide-react";

type HomepageGifsProps = {
  img: string;
  alt: string;
};

const HomepageGifs: React.FC<HomepageGifsProps> = ({ img, alt }) => {
  return (
    <div className="relative gif cursor-pointer">
      <Image
        src={img}
        alt={alt}
        height={500}
        width={300}
        className="rounded-xl hover:bg-black cursor-pointer "
      />
      <div className="gif-card-details absolute top-0 left-0 right-0 bottom-0 hidden bg-black/50 rounded-xl">
        <div className="relative h-full w-full">
          <div className="absolute top-3 right-3">
            <button className="py-1 px-2 rounded-2xl bg-primary text-sm text-primary-foreground hover:bg-primary/80">
              Save
            </button>
          </div>
          <div className="absolute bottom-3 right-3 flex space-x-2 trigger-reaction-pallet">
            <div className="relative flex flex-row-reverse space-x-2 items-center  ">
              <div>
                <SmilePlus className="text-primary-foreground cursor-pointer hover:text-primary-foreground/80 relative ml-1" />
              </div>
              <div className=" reaction-pallet ">
                <Image
                  src={"/rage.gif"}
                  height={30}
                  width={30}
                  alt="laugh"
                  className="hover:scale-[1.5]  scale-125"
                />
                <Image
                  src={"/sad.gif"}
                  height={30}
                  width={30}
                  alt="laugh"
                  className="hover:scale-[1.5]  scale-125"
                />
                <Image
                  src={"/heart.gif"}
                  height={30}
                  width={30}
                  alt="laugh"
                  className="hover:scale-[1.5]  scale-125"
                />
                <Image
                  src={"/lol.gif"}
                  height={30}
                  width={30}
                  alt="laugh"
                  className="hover:scale-[1.5]  scale-125"
                />
              </div>
            </div>
            <div>
              <CircleEllipsis className="text-primary-foreground cursor-pointer hover:text-primary-foreground/80" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomepageGifs;
