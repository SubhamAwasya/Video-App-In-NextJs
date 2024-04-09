import { useRouter } from "next/router";
import React from "react";

function Subscription() {
  const router = useRouter();

  useEffect(() => {
    if (!window.localStorage.getItem("user")) {
      router.push("/");
    }
  }, []);
  return <div>Subscription VideoGrid</div>;
}

export default Subscription;
