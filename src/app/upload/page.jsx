"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// Icons
import { BiVideo } from "react-icons/bi";
import { BiImage } from "react-icons/bi";

// my Imports
import { storage } from "@/helper/clientFirebase";

function Upload() {
  const router = useRouter();

  const [isUploadingVideo, setIsUploadingVideo] = useState(false);

  // Video
  const [videoFile, setVideoFile] = useState(null);
  const [videoUploadPercentage, setVideoUploadPercentage] = useState(null);
  const [videoURL, setVideoURL] = useState(null);

  // Thumbnail
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [thumbnailUploadPercentage, setThumbnailUploadPercentage] =
    useState(null);
  const [thumbnailURL, setThumbnailURL] = useState(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");

  // Upload Video =============================================================================================
  const uploadVideo = () => {
    if (!videoFile) return;
    const metadata = {
      contentType: videoFile.type,
    };
    const storageRef = ref(storage, `videos/${Date.now() + videoFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, videoFile, metadata);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setVideoUploadPercentage(Math.round(progress) + "%");
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setVideoURL(downloadURL);
          setVideoUploadPercentage("Upload Complete");
        });
      }
    );
  };
  const handleVideoChange = (e) => {
    setVideoFile(null);
    setVideoUploadPercentage(null);
    setVideoURL("");
    try {
      const file = e.target.files[0];
      setVideoFile(file);
    } catch (error) {
      console.log(error);
    }
  };
  // Upload Thumbnail =============================================================================================
  const uploadThumbnail = () => {
    if (!thumbnailFile) return;
    const metadata = {
      contentType: thumbnailFile.type,
    };
    const storageRef = ref(
      storage,
      `images/${Date.now() + thumbnailFile.name}`
    );
    const uploadTask = uploadBytesResumable(
      storageRef,
      thumbnailFile,
      metadata
    );
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setThumbnailUploadPercentage(Math.round(progress) + "%");
        console.log(thumbnailUploadPercentage);
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setThumbnailURL(downloadURL);
          setThumbnailUploadPercentage("100%");
          setThumbnailUploadPercentage("Upload Complete");
        });
      }
    );
  };
  const handleThumbnailChange = (e) => {
    setThumbnailFile(null);
    setThumbnailUploadPercentage(null);
    setThumbnailURL("");
    try {
      const file = e.target.files[0];
      setThumbnailFile(file);
    } catch (error) {
      console.log(error);
    }
  };
  // Submit Form =============================================================================================
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsUploadingVideo(true);
    // Handle form submission (e.g., upload video to server)

    const requestData = {
      title: e.target.title.value,
      description: e.target.description.value,
      tags: e.target.tags.value,
      videoURL,
      thumbnailURL,
    };

    await fetch(process.env.NEXT_PUBLIC_UPLOAD_VIDEO, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setIsUploadingVideo(false);
        alert(res.message);
      })
      .catch((error) => {
        setIsUploadingVideo(false);
        console.log(error);
      });

    // Reset form fields
    setVideoFile(null);
    setVideoUploadPercentage(null);
    setVideoURL(null);
    setThumbnailFile(null);
    setThumbnailUploadPercentage(null);
    setThumbnailURL(null);
    setTitle("");
    setDescription("");
    setTags("");
  };

  useEffect(() => {
    if (!window.localStorage.getItem("isLoggedIn")) {
      router.push("/");
    }
  }, []);
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-xl font-semibold mb-4 ">Upload Video</h2>
      <div className="flex items-center w-full mx-auto bg-neutral-900 rounded-2xl max-md:flex-col">
        {/* Video Thumbnail container */}
        <div className="flex flex-row max-lg:flex-col gap-4 py-10 px-8">
          {/* Video */}
          <div className="flex flex-col items-center">
            <span className="w-[250px] text-wrap">Video :</span>
            <label
              htmlFor="videoFile"
              className="flex justify-center items-center font-medium text-white w-[250px] h-[144px] border-2 rounded-xl  border-white cursor-pointer hover:bg-neutral-800"
            >
              {videoFile ? (
                <video
                  src={URL.createObjectURL(videoFile)}
                  autoPlay
                  loop
                  className="rounded-xl w-[250px] h-[140px]"
                />
              ) : (
                <BiVideo className="text-5xl w-full h-full" />
              )}
            </label>
            <div className="w-full">
              <span>
                {/*Progress Bar*/}
                {videoUploadPercentage && (
                  <div className="relative pt-1 mt-2">
                    <div className="overflow-hidden h-5 mb-4 text-neutral-900 text-sm font-semibold flex items-center rounded bg-gray-200">
                      <div
                        className="bg-red-500 p-1"
                        style={{ width: `${videoUploadPercentage}` }}
                      >
                        {videoUploadPercentage}
                      </div>
                    </div>
                  </div>
                )}
              </span>
            </div>
            <button
              className="bg-blue-500 w-52 m-2 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-40 disabled:cursor-not-allowed"
              onClick={uploadVideo}
              disabled={videoFile && videoUploadPercentage <= 0 ? false : true}
            >
              Upload Video
            </button>
            <input
              type="file"
              id="videoFile"
              accept="video/*"
              onChange={handleVideoChange}
              className="mt-1 w-0 h-0"
            />
          </div>
          {/* Thumbnail */}
          <div className="flex flex-col items-center">
            <span className="w-[250px] text-wrap">Thumbnail :</span>
            <label
              htmlFor="imageFile"
              className="flex justify-center items-center font-medium text-white w-[250px] h-[144px] border-2 rounded-xl  border-white cursor-pointer hover:bg-neutral-800"
            >
              {thumbnailFile ? (
                <Image
                  width={50}
                  height={50}
                  alt="Thumbnail"
                  src={URL.createObjectURL(thumbnailFile)}
                  className="rounded-xl w-[250px] h-[140px]"
                />
              ) : (
                <BiImage className="text-5xl w-full h-full" />
              )}
            </label>
            <div className="w-full">
              <span>
                {/*Progress Bar*/}
                {thumbnailUploadPercentage && (
                  <div className="relative pt-1 mt-2">
                    <div className="overflow-hidden h-5 mb-4 text-neutral-900 text-sm font-semibold flex items-center rounded bg-gray-200">
                      <div
                        className="bg-red-500 p-1"
                        style={{ width: `${thumbnailUploadPercentage}` }}
                      >
                        {thumbnailUploadPercentage}
                      </div>
                    </div>
                  </div>
                )}
              </span>
            </div>
            <button
              className="bg-blue-500 w-52 m-2 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-40 disabled:cursor-not-allowed"
              onClick={uploadThumbnail}
              disabled={
                thumbnailFile && thumbnailUploadPercentage <= 0 ? false : true
              }
            >
              Upload Thumbnail
            </button>
            <input
              type="file"
              id="imageFile"
              accept="image/*"
              onChange={handleThumbnailChange}
              className="mt-1 w-0 h-0"
            />
          </div>
        </div>
        {/* Video Detail form container */}
        <form
          className="flex max-md:flex-col py-10 px-8 max-md:w-80 "
          onSubmit={handleFormSubmit}
        >
          <div className="flex flex-col gap-3">
            {/* Title */}
            <input
              required
              name="title"
              placeholder="Title"
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="p-2 outline-none bg-neutral-900  border-neutral-400 border-b-2"
            />
            {/* Description */}
            <textarea
              required
              name="description"
              placeholder="Description"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 w-full h-24 resize-none p-2 rounded-lg  outline-none bg-neutral-900  border-neutral-400 border-2"
            />
            {/* Tags */}
            <input
              required
              name="tags"
              placeholder="Tags (Comma separate)"
              type="text"
              id="tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="p-2 outline-none bg-neutral-900  border-neutral-400 border-b-2"
            />

            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-40 disabled:cursor-not-allowed"
              disabled={
                videoURL && thumbnailURL && !isUploadingVideo ? false : true
              }
            >
              {!isUploadingVideo ? (
                "Upload"
              ) : (
                <div className="dot-container relative top-3 h-6">
                  <div className="dot"></div>
                  <div className="dot"></div>
                  <div className="dot"></div>
                  <div className="dot"></div>
                  <div className="dot"></div>
                </div>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Upload;
