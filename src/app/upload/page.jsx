"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

// my Imports
import { storage } from "@/utils/clientFirebase";
import FileInput from "@/components/ui-components/FileInput";

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
        setVideoUploadPercentage(Math.round(progress));
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
        setThumbnailUploadPercentage(Math.round(progress));
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
      title,
      description,
      tags,
      videoURL,
      thumbnailURL,
    };

    await fetch("/api/user/upload-video", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
      .then((res) => res.json())
      .then((res) => {
        alert("Video uploaded successfully!");
        router.push("/profile");
        setIsUploadingVideo(false);
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
    if (!window.localStorage.getItem("user")) {
      router.push("/");
    }
  }, []);

  return (
    <>
      <div className="flex bg-primary m-4 p-10 rounded-xl gap-4 max-md:flex-col max-md:m-2">
        <div className="w-auto">
          <FileInput
            fileAccept="video/*"
            file={videoFile}
            setFile={handleVideoChange}
            upload={uploadVideo}
            percentage={videoUploadPercentage}
          />
          <hr className="my-2"></hr>
          <FileInput
            fileAccept="image/*"
            file={thumbnailFile}
            setFile={handleThumbnailChange}
            upload={uploadThumbnail}
            percentage={thumbnailUploadPercentage}
          />
        </div>
        <form
          onSubmit={handleFormSubmit}
          className="flex flex-col items-center gap-2 "
        >
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="input input-bordered w-full max-md:w-72"
          />
          <textarea
            rows={10}
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="textarea textarea-bordered textarea-lg w-full max-md:w-72 text-sm"
          ></textarea>
          <textarea
            placeholder="Tags : comment separate with comma"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            required
            className="textarea textarea-bordered textarea-lg w-full max-md:w-72 text-sm"
          ></textarea>
          <button
            disabled={!videoURL || !thumbnailURL}
            className="btn btn-info"
          >
            Upload Video
          </button>
        </form>
      </div>
    </>
  );
}

export default Upload;
