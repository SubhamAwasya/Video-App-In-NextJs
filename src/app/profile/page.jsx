"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useMyContext } from "@/context/ContextProvider";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "@/utils/clientFirebase";
import Image from "next/image";
import VideoGrid from "@/components/VideoGrid";

function Profile() {
  const router = useRouter();

  const { user, LogIn } = useMyContext();

  const [profile, setProfile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [myVideos, setMyVideos] = useState([]);

  function UpdateProfile() {
    if (!profile) return;
    const metadata = {
      contentType: profile.type,
    };
    setIsUploading(true);
    const storageRef = ref(storage, `images/${Date.now() + profile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, profile, metadata);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (error) => {
        console.log(error);
        setIsUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          fetch("/api/user/update-profile", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              profileUrl: downloadURL,
            }),
          })
            .then((res) => {
              if (res.status === 200) {
                alert("Profile Updated Successfully");
                setProfile(null);
                setIsUploading(false);
              }
              return res.json();
            })
            .then((res) => {
              LogIn(res.data);
            });
        });
      }
    );
  }

  function ProfileImageInput() {
    return (
      <div className="flex flex-col w-fit gap-2 mb-2">
        <Image
          priority
          src={
            (profile && URL?.createObjectURL(profile)) ||
            user?.profileImg ||
            "/DefaultProfile.png"
          }
          width={100}
          height={100}
          alt="Thumbnail"
          className="w-[125px] aspect-square rounded-md"
        />
        <input
          id="videoFile"
          type="file"
          onChange={(e) => {
            setProfile(e.target.files[0]);
          }}
          accept="image/*"
          className="file-input file-input-bordered file-input-sm w-[125px] "
        />
        {profile && (
          <button
            onClick={(e) => {
              UpdateProfile();
            }}
            disabled={isUploading}
            className="btn btn-outline btn-success w-[125px] "
          >
            {isUploading ? (
              <span className="loading loading-spinner loading-lg"></span>
            ) : (
              "Update Profile"
            )}
          </button>
        )}
      </div>
    );
  }

  function getMyVideos() {
    fetch("/api/user/get-my-videos")
      .then((res) => res.json())
      .then((res) => {
        setMyVideos(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    if (!window.localStorage.getItem("user")) {
      router.push("/");
      return;
    }
    getMyVideos();
  }, [router]);

  return (
    <div className="flex flex-col w-full p-4 gap-4 max-md:items-center">
      <div className="flex flex-col items-center w-full">
        <ProfileImageInput />
        <form className="flex flex-col gap-2">
          <input
            type="text"
            name="name"
            placeholder={user?.name}
            className="input input-bordered w-full max-w-xs"
          />
          <input
            type="text"
            name="email"
            placeholder={user?.email}
            className="input input-bordered w-full max-w-xs"
          />
          <div>subscribers : {user?.subscribers}</div>
        </form>
      </div>
      <hr></hr>

      {myVideos === "Unauthorized" ? (
        <h1>Log in Again to See Your Videos</h1>
      ) : (
        <>
          <h1>My Videos</h1>
          <VideoGrid videos={myVideos} />
        </>
      )}
    </div>
  );
}

export default Profile;
