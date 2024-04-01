import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useMyContext } from "@/context/ContextProvider";

function Video({ video }) {
  const [user, setUser] = useState(null);
  const myContext = useMyContext();

  function getUser() {
    fetch(process.env.NEXT_PUBLIC_GET_USER + video?.data?.userID)
      .then((res) => res.json())
      .then((res) => {
        setUser(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    if (!video) {
      return;
    }
    getUser();
  }, []);
  return (
    <Link
      href={"/video_player"}
      onClick={() => {
        myContext.setVideo(video);
      }}
    >
      <div className="flex flex-col min-h-9 rounded-xl p-1 hover:bg-neutral-500 ">
        <div>
          <Image
            priority
            src={video?.data?.thumbnailURL}
            width={400}
            height={400}
            alt="Thumbnail"
            className="w-full h-full rounded-xl aspect-video"
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
            <h2>{video?.data?.title}</h2>
            <h3 className="text-neutral-300 text-[0.8rem]">{user?.name}</h3>
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
