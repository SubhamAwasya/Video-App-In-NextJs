"use client";
import Video from "./Video";
import { useMyContext } from "@/context/ContextProvider.jsx";

function VideoGrid({ videos }) {
  const myContext = useMyContext();
  if (!videos) return "";

  return (
    <div className={`video-page-container gap-4 h-fit w-full`}>
      {videos?.map((video, i) => (
        <Video key={i} video={video} />
      ))}
    </div>
  );
}

export default VideoGrid;
