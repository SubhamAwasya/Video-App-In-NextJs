"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useContext } from "react";
import { format } from "timeago.js";
import { useParams } from "next/navigation";

// My
import { useMyContext } from "@/context/ContextProvider";
import Textarea from "@/components/ui-components/Textarea";
import VideoGrid from "@/components/VideoGrid";

// icons import
import { BiLike } from "react-icons/bi";
import { BiDislike } from "react-icons/bi";
import { MdOutlineSubscriptions } from "react-icons/md";

const VideoPlayer = () => {
  const myContext = useMyContext();
  const user = myContext.user;

  const [videoData, setVideoData] = useState({});
  const [userData, setUserData] = useState({});
  const [comments, setComments] = useState([]);

  const params = useParams();

  const [suggestVideo, setSuggestVideo] = useState(null);

  function getRandomVideos() {
    fetch("/api/videos/get-random-videos")
      .then((res) => res.json())
      .then((res) => setSuggestVideo(res))
      .catch((error) => {
        console.log(error);
      });
  }

  function getUser(id) {
    fetch("/api/user/get-user/" + id)
      .then((res) => res.json())
      .then((res) => {
        setUserData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  function getVideo() {
    fetch("/api/videos/get-video/" + params.id)
      .then((res) => res.json())
      .then((res) => {
        setVideoData(res.data);
        getUser(res?.data?.userId);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    getRandomVideos();
  }, []);

  useEffect(() => {
    getVideo();
    window.scrollTo(0, -1);
    // video play from start
    const VP = document.getElementById("videoPlayer");
    addEventListener("DOMContentLoaded", () => {
      VP.currentTime = 0;
      VP.play();
    });
  }, [setVideoData, setComments]);

  if (!videoData) return <div>Loading...</div>;

  return (
    <div className="flex justify-center w-full m-2 max-md:m-0 ">
      <div className="w-full max-w-[60rem]">
        {/*Video Tag is hear-----------------------------------------------------------------------------------------------------------------------*/}
        <video
          id="videoPlayer"
          className="-z-10 w-full aspect-video rounded-lg mt-4"
          src={videoData.videoUrl}
          autoPlay
          controls
        ></video>
        <div className="-z-10 w-full rounded-lg p-2 h-16">
          {/*title -----------------------------------------------------------------------------------------------------------------------*/}
          <div className="text-2xl mb-2">{videoData?.title}</div>
          <div className="justify-between flex video_player-detail">
            <div className="flex items-center">
              {/*User profile img-----------------------------------------------------------------------------------------------------------------------*/}
              <Link
                href={"/profile"}
                state={{ isOtherUserProfile: true, ...userData }}
              >
                <Image
                  src={userData?.profileImg || "/DefaultProfile.png"}
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
                  className="video_player-channel_name font-bold"
                >
                  {userData?.name}
                </Link>
                {/*user subscribers-----------------------------------------------------------------------------------------------------------------------*/}
                <div className="text-sm opacity-50">12m subscribers</div>
                <div className="text-sm opacity-50">
                  Views {videoData?.views} . {format(videoData?.createdAt)}
                </div>
              </div>
            </div>
            <div className="flex gap-2 max-sm:flex-col">
              <button
                disabled={!user}
                onClick={() => {}}
                className="btn btn-info
      "
              >
                <BiLike />
                Like &nbsp;
                {videoData?.likes?.length}
              </button>
              <button
                disabled={!user}
                onClick={() => {}}
                className="btn btn-info
      "
              >
                <BiDislike />
                Dislike &nbsp;
                {videoData?.dislikes?.length}
              </button>
              <button
                disabled={!user}
                className="btn btn-error
      "
              >
                <MdOutlineSubscriptions />
                Subscribe
              </button>
            </div>
          </div>
          <hr className="m-4"></hr>

          {/*input comments-----------------------------------------------------------------------------------------------------------------------*/}
          <Textarea />
          {/*comments-----------------------------------------------------------------------------------------------------------------------
          <div className="video_comments_container mt-2">
            <span className="text-lg font-extrabold">Comments :</span>
            {comments.map((element, i) => {
              return <Comment key={i} props={element} />;
            })}
          </div>*/}
        </div>
      </div>
      {/*right video suggestion-----------------------------------------------------------------------------------------------------------------------*/}
      <div className="flex-col w-full max-w-96 max-lg:hidden pl-5 h-fit">
        <VideoGrid videos={suggestVideo} />
      </div>
    </div>
  );
};

export default VideoPlayer;
