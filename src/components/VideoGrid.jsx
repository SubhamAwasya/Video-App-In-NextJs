import Video from "./Video";

function VideoGrid({ videos }) {
  if (!videos) return "";
  return (
    <div className={`video-page-container gap-4 h-fit w-full md:p-4`}>
      {videos?.map((video, i) => (
        <Video key={i} video={video} />
      ))}
    </div>
  );
}

export default VideoGrid;
