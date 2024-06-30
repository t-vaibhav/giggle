import Navbar from "@/components/utility/Navbar";
import HomepageGifs from "@/components/utility/HomepageGifs";
import Image from "next/image";
import data from "@/components/utility/data";
export default function Home() {
  const gifs = data.gifs.map((item, index) => {
    return <HomepageGifs img={item.img} alt={item.alt} key={index} />;
  });
  return (
    <main className="pt-16">
      <div className="columns-6 gap-3 space-y-3 mx-10 mt-5">
        {gifs}
        {/* {gifs} */}
        {/* {gifs} */}
        {/* {gifs} */}
        {/* {gifs} */}
      </div>
    </main>
  );
}
