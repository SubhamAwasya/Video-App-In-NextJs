"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

// Icons
import { BiLogOut } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { AiOutlineSearch } from "react-icons/ai";
import { BiMenu } from "react-icons/bi";
import { AiOutlineCloudUpload } from "react-icons/ai";
// local
import { useMyContext } from "@/context/ContextProvider.jsx";

const Navbar = () => {
  const myContext = useMyContext();
  const [userMenu, setUserMenu] = useState(false);

  return (
    <nav className="text-white flex w-full justify-between items-center h-14 p-4 fixed top-0 z-50 bg-neutral-900">
      {/* ---------- LEFT ---------- */}
      <div className="flex items-center">
        <BiMenu
          className="text-[2rem] text-red-500 cursor-pointer hover:border-2 rounded-lg border-red-500"
          onClick={() => myContext.setToggleSidebar((prev) => !prev)}
        />
        <Link
          href={"/"}
          className="flex gap-2 ml-2 max-md:hidden font-bold text-xl"
        >
          VIDEOAPP
        </Link>
      </div>
      {/* ---------- MIDDLE ---------- */}
      <div className="flex justify-center items-center">
        <input
          className="w-96 h-10 pl-4 rounded-tl-full outline-none rounded-bl-full max-lg:w-60 max-sm:w-36 bg-neutral-800"
          placeholder="Search Videos"
        />
        <AiOutlineSearch className="h-10 pr-4 text-4xl rounded-tr-full rounded-br-full bg-neutral-800" />
      </div>
      {/* ---------- RIGHT ---------- */}
      {/* UserMenu */}
      {myContext.user ? (
        <div
          className="flex gap-2 items-center cursor-pointer z-50"
          onClick={() => setUserMenu((prev) => !prev)}
        >
          {userMenu && (
            <div className="fixed w-40 h-fit right-10 top-12 text-sm bg-neutral-700 rounded-lg p-2 shadow-xl shadow-neutral-800">
              <Link
                href={"/profile"}
                className={`w-full h-10 px-2 gap-2 flex items-center rounded-xl  hover:bg-neutral-500
          `}
              >
                <span className="text-2xl">
                  <CgProfile />
                </span>
                Profile
              </Link>
              <Link
                href={"/upload"}
                className={`w-full h-10 px-2 gap-2 flex items-center rounded-xl  hover:bg-neutral-500
          `}
              >
                <span className="text-2xl">
                  <AiOutlineCloudUpload />
                </span>
                Upload Video
              </Link>
              <Link
                href={"/"}
                className={`w-full h-10 px-2 gap-2 flex items-center rounded-xl  hover:bg-red-600
          `}
                onClick={myContext.LogOut}
              >
                <span className="text-2xl">
                  <BiLogOut />
                </span>
                LogOut
              </Link>
            </div>
          )}
          <h1>{myContext.user.name}</h1>
          <Image
            alt="Avatar"
            src={"/DefaultProfile.png"}
            width={100}
            height={100}
            className="w-8 h-8 rounded-full"
          ></Image>
        </div>
      ) : (
        <div className="flex gap-2">
          <button
            className=""
            onClick={() => {
              myContext.setToggleLoginPage((prev) => !prev);
            }}
          >
            Login
          </button>
          <button
            className=""
            onClick={() => {
              myContext.setToggleSignupPage((prev) => !prev);
            }}
          >
            SignUp
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
