"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
// Icons
import { BiVideo } from "react-icons/bi";
import { BiImage } from "react-icons/bi";

function Upload() {
  const router = useRouter();

  const [videoFile, setVideoFile] = useState("");
  const [title, setTitle] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    setVideoFile(file);
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    console.log(URL.createObjectURL(file));
    console.log(file);
    setThumbnail(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., upload video to server)
    console.log("Form submitted!");
    console.log("Video File:", videoFile);
    console.log("Title:", title);
    console.log("Thumbnail File:", thumbnail);
    console.log("Description:", description);
    console.log("Tags:", tags);
    // Reset form fields
    setVideoFile(null);
    setTitle("");
    setThumbnail(null);
    setDescription("");
    setTags("");
  };

  useEffect(() => {
    if (!window.localStorage.getItem("isLoggedIn")) {
      router.push("/");
    }
  }, []);
  return (
    <div className="flex flex-col items-center w-full marker:max-w-md mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4 ">Upload Video</h2>
      <form
        onSubmit={handleSubmit}
        className="flex max-md:flex-col py-10 px-8  rounded-2xl bg-neutral-900"
      >
        <div className="flex flex-col max-md:flex-row">
          <div className="flex flex-col items-center mb-4">
            <label
              htmlFor="videoFile"
              className="block font-medium text-white w-60 h-32 m-5 text-center cent border-2  rounded-xl  border-white max-md:w-32 max-md:h-16 cursor-pointer hover:bg-neutral-800"
            >
              <BiVideo className="text-5xl w-full h-full" />
            </label>

            <input
              type="file"
              id="videoFile"
              accept="video/*"
              onChange={handleVideoChange}
              className="mt-1 w-0 h-0"
            />
            <span>Upload Video {videoFile}</span>
          </div>
          <div className="flex flex-col items-center mb-4">
            <label
              htmlFor="thumbnail"
              className="block font-medium text-white w-60 h-32 m-5 text-center cent border-2 rounded-xl  border-white max-md:w-32 max-md:h-16 cursor-pointer hover:bg-neutral-800"
            >
              <BiImage className="text-5xl w-full h-full" />
            </label>
            <Image
              src={thumbnail || ""}
              width={100}
              height={100}
              alt="Thumbnail"
            ></Image>
            <input
              type="file"
              id="thumbnail"
              accept="image/*"
              onChange={handleThumbnailChange}
              className="mt-1 w-0 h-0"
            />
            <span>Upload Thumbnail</span>
          </div>
        </div>
        <div className="flex flex-col mt-4 gap-3">
          <input
            placeholder="Title"
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="p-2 outline-none bg-neutral-900  border-neutral-400 border-b-2"
          />

          <textarea
            placeholder="Description"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 w-full h-24 resize-none p-2 rounded-lg  outline-none bg-neutral-900  border-neutral-400 border-2"
          />

          <input
            placeholder="Tags (Comma separate)"
            type="text"
            id="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="p-2 outline-none bg-neutral-900  border-neutral-400 border-b-2"
          />

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Upload
          </button>
        </div>
      </form>
    </div>
  );
}

export default Upload;
