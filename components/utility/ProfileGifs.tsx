import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CircleEllipsis } from "lucide-react";

type ProfileGifsProps = {
  img: string;
  alt: string;
};

const ProfileGifs: React.FC<ProfileGifsProps> = ({ img, alt }) => {
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
            <button className="py-1 px-2 rounded-2xl bg-destructive text-sm text-destructive-foreground hover:bg-destructive/80">
              Edit
            </button>
          </div>
          <div className="absolute bottom-3 right-3">
            <CircleEllipsis className="text-primary-foreground cursor-pointer hover:text-primary-foreground/80" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileGifs;
