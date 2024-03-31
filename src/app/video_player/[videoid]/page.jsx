"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useContext } from "react";
import { format } from "timeago.js";

// components import
import Video from "@/components/Video.jsx";
import Comment from "@/components/Comment.jsx";

// icons import
import { BiLike } from "react-icons/bi";
import { BiDislike } from "react-icons/bi";
import { MdOutlineSubscriptions } from "react-icons/md";

const VideoPlayer = () => {
  const { user } = {};
  const [videoData, setVideoData] = useState({});
  const [userData, setUserData] = useState({});
  const [comments, setComments] = useState([]);

  // resizing textarea based on text present in text box
  function AutoResizingTextarea(event) {
    const textarea = event.target;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  }

  useEffect(() => {
    window.scrollTo(0, -1);
    // video play from start
    const VP = document.getElementById("videoPlayer");
    addEventListener("DOMContentLoaded", () => {
      VP.currentTime = 0;
      VP.play();
    });
  }, [setVideoData, setComments]);

  return (
    <div className="flex justify-center w-full m-2 max-md:m-0 min-h-screen h-fit">
      <div className="w-full max-w-[100rem]">
        {/*Video Tag is hear-----------------------------------------------------------------------------------------------------------------------*/}
        <video
          id="videoPlayer"
          className="-z-10 w-full aspect-video rounded-lg"
          src={"OnePiece.mkv"}
          autoPlay
          controls
        ></video>
        <div className="-z-10 w-full rounded-lg p-2 h-16">
          {/*title -----------------------------------------------------------------------------------------------------------------------*/}
          <div className="text-2xl mb-2">{videoData.title}</div>
          <div className="justify-between flex video_player-detail">
            <div className="flex items-center">
              {/*User profile img-----------------------------------------------------------------------------------------------------------------------*/}
              <Link
                href={"/profile"}
                state={{ isOtherUserProfile: true, ...userData }}
              >
                <Image
                  src={""}
                  width={100}
                  height={100}
                  alt=""
                  className="ml-2 w-16 h-16 aspect-square rounded-full"
                ></Image>
              </Link>
              <div className="ml-2">
                {/*user / channel name-----------------------------------------------------------------------------------------------------------------------*/}
                <Link
                  href={`/profile`}
                  state={{ isOtherUserProfile: true, ...userData }}
                  className="video_player-channel_name font-bold"
                >
                  {userData.name}
                </Link>
                {/*user subscribers-----------------------------------------------------------------------------------------------------------------------*/}
                <div className="text-sm opacity-50">12m subscribers</div>
                <div className="text-sm opacity-50">
                  Views {"20"} . {format("2024/02/21")}
                </div>
              </div>
            </div>
            <div className="flex gap-2 max-sm:flex-col">
              <button
                disabled={!user}
                onClick={() => {}}
                className="flex items-center justify-center gap-2 w-32 p-2 rounded-xl border-2 hover:bg-neutral-600 hover:border-2
      "
              >
                <BiLike />
                Like
                {videoData.likes?.length}
              </button>
              <button
                disabled={!user}
                onClick={() => {}}
                className="flex items-center justify-center gap-2 w-32 p-2 rounded-xl border-2 hover:bg-neutral-600 hover:border-2
      "
              >
                <BiDislike />
                Dislike
                {videoData.dislikes?.length}
              </button>
              <button
                disabled={!user}
                className="flex items-center justify-center gap-2 w-32 p-2 rounded-xl border-2 hover:bg-neutral-600 hover:border-2
      "
              >
                <MdOutlineSubscriptions />
                Subscribe
              </button>
            </div>
          </div>
          <hr className="m-4"></hr>

          {/*input comments-----------------------------------------------------------------------------------------------------------------------*/}
          <div className="flex flex-col items-end">
            <textarea
              maxLength="200"
              placeholder={user ? "Add comment :" : "Login to add comment"}
              disabled={!user}
              onChange={(e) => {}}
              value={""}
              onInput={AutoResizingTextarea}
              className="w-full resize-none overflow-hidden rounded-lg p-2 text-sm outline-none"
            />
            {!user || (
              <button
                onClick={createNewComment}
                className="flex items-center justify-center h-[2rem] py-1 px-2 mt-2 rounded-lg border-2 border-neutral-400 hover:border-red-500 hover:text-red-500 text-xs disabled:text-zinc-700 disabled:border-zinc-700"
              >
                Comment
              </button>
            )}
          </div>
          {/*comments-----------------------------------------------------------------------------------------------------------------------*/}
          <div className="video_comments_container mt-2">
            <span className="text-lg font-extrabold">Comments :</span>
            {comments.map((element, i) => {
              return <Comment key={i} props={element} />;
            })}
          </div>
        </div>
      </div>
      {/*right video suggestion-----------------------------------------------------------------------------------------------------------------------*/}
      <div className="flex-col w-full max-w-96 max-lg:hidden pl-5 h-fit">
        <Video />
        <Video />
        <Video />
        <Video />
        <Video />
      </div>
    </div>
  );
};

export default VideoPlayer;
