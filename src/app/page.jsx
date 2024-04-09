"use client";

import { useEffect, useState } from "react";
// My
import VideoGrid from "@/components/VideoGrid";

export default function Home() {
  const [videos, setVideos] = useState(null);

  function getRandomVideos() {
    fetch("/api/videos/get-random-videos")
      .then((res) => res.json())
      .then((res) => setVideos(res))
      .catch((error) => {
        console.log(error);
      });
  }
  useEffect(() => {
    getRandomVideos();
  }, []);

  if (!videos) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <span className="loading loading-infinity w-32 h-32"></span>
      </div>
    );
  }

  return <>{<VideoGrid videos={videos} />}</>;
}
