"use client";
import Video from "./Video";
import { useMyContext } from "@/context/ContextProvider.jsx";

function VideoGrid() {
  const myContext = useMyContext();

  return (
    <div
      className={`video-page-container gap-4 h-fit w-full
       `}
    >
      <Video />
      <Video />
      <Video />
      <Video />
      <Video />
      <Video />
      <Video />
      <Video />
      <Video />
      <Video />
      <Video />
      <Video />
      <Video />
      <Video />
      <Video />
      <Video />
      <Video />
      <Video />
      <Video />
      <Video />
      <Video />
    </div>
  );
}

export default VideoGrid;
