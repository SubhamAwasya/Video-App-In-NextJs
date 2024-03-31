"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

function Profile() {
  const router = useRouter();

  useEffect(() => {
    if (!window.localStorage.getItem("isLoggedIn")) {
      router.push("/");
    }
  }, []);
  return <div>Profile</div>;
}

export default Profile;
