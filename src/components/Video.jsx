"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { format } from "timeago.js";

function Video({ video }) {
  const [user, setUser] = useState(null);

  function getUser() {
    fetch(process.env.NEXT_PUBLIC_GET_USER + video?.userId)
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

  useEffect(() => {
    if (!user) {
      return;
    }
  }, [user]);

  return (
    <Link href={`/video_player/${video?._id}`}>
      <div className="flex flex-col min-h-9 rounded-xl p-1 hover:bg-neutral-500 ">
        <div>
          <Image
            priority
            src={video?.thumbnail}
            width={400}
            height={400}
            alt="Thumbnail"
            className="w-full h-full rounded-xl aspect-video"
          ></Image>
        </div>
        <div className="flex w-auto">
          <Image
            src={user?.profileImg || "/DefaultProfile.png"}
            width={100}
            height={100}
            alt=""
            className="w-10 h-10 rounded-full mt-2 mr-2"
          ></Image>
          <div>
            <h2>
              {video?.title.substring(0, 50)}
              {video?.title.length > 50 ? "..." : ""}
            </h2>
            <h3 className="text-neutral-300 text-[0.8rem]">{user?.name}</h3>
            <h3 className="text-neutral-300 text-[0.8rem]">
              {video?.views} views . {format(video?.createdAt)}
            </h3>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Video;
