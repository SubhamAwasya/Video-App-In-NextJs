import Link from "next/link";
import React from "react";
import Image from "next/image";

function Video() {
  return (
    <Link href={"/video_player/1"}>
      <div className="flex flex-col min-h-9 rounded-xl p-1 hover:bg-neutral-500 ">
        <div>
          <Image
            priority
            src="/854169.jpg"
            width={400}
            height={400}
            alt="Thumbnail"
            className="w-full h-full rounded-xl"
          ></Image>
        </div>
        <div className="flex w-auto">
          <Image
            src="/DefaultProfile.png"
            width={100}
            height={100}
            alt=""
            className="w-10 h-10 rounded-full mt-2 mr-2"
          ></Image>
          <div>
            <h2>
              Rickshaw Kahan Hain? - Taarak Mehta Ka Ooltah 12345 Chashmah
            </h2>
            <h3 className="text-neutral-300 text-[0.8rem]">Sony SAB</h3>
            <h3 className="text-neutral-300 text-[0.8rem]">
              60k views . 1 month ago
            </h3>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Video;
