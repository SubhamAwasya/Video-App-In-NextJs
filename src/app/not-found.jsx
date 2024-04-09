import React from "react";
import Link from "next/link";

function NotFound() {
  return (
    <div className="w-full h-auto pt-40 flex flex-col justify-center items-center text-3xl font-bold ">
      <h1 className="text-9xl">404</h1>
      <h2>PAGE NOT FOUND</h2>
      <Link href="/">
        <button className="btn btn-warning mt-5">Back to Home</button>
      </Link>
    </div>
  );
}

export default NotFound;
