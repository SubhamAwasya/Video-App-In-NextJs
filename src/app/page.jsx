"use client";

import { useEffect, useState } from "react";
// My
import VideoGrid from "@/components/VideoGrid";

export default function Home() {
  const [videos, setVideos] = useState(null);

  function getRandomVideos() {
    fetch(process.env.NEXT_PUBLIC_RANDOM_VIDEO)
      .then((res) => res.json())
      .then((res) => setVideos(res))
      .catch((error) => {
        console.log(error);
      });
  }
  useEffect(() => {
    getRandomVideos();
  }, []);

  return (
    <>
      <VideoGrid videos={videos} />
    </>
  );
}
