"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

// local
import { useMyContext } from "@/context/ContextProvider.jsx";

const Navbar = () => {
  const myContext = useMyContext();
  const [userMenu, setUserMenu] = useState(false);

  return (
    <div className="navbar bg-base-100 border-b-[1px] border-neutral-800">
      <div className="navbar-start">
        <label htmlFor="my-drawer" className="btn drawer-button btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="2em"
            height="2em"
            viewBox="0 0 24 24"
          >
            <g fill="none">
              <path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"></path>
              <path
                fill="#ffffff"
                d="M20 17.5a1.5 1.5 0 0 1 .144 2.993L20 20.5H4a1.5 1.5 0 0 1-.144-2.993L4 17.5zm0-7a1.5 1.5 0 0 1 0 3H4a1.5 1.5 0 0 1 0-3zm0-7a1.5 1.5 0 0 1 0 3H4a1.5 1.5 0 1 1 0-3z"
              ></path>
            </g>
          </svg>
        </label>
        <Link
          href={"/"}
          className="link no-underline text-xl px-3 max-md:hidden"
        >
          VIDEO APP
        </Link>
      </div>
      <div className="navbar-center">
        <label className="h-10 max-md:w-40 input rounded-full input-bordered flex items-center gap-2">
          <input type="text" className="grow" placeholder="Search" />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label>
      </div>
      <div className="navbar-end">
        {myContext.user ? (
          <div className="dropdown dropdown-end flex items-center gap-2">
            <span>{myContext.user.name}</span>
            <div
              tabIndex="0"
              role="button"
              className="btn btn-ghost btn-circle avatar "
            >
              <div className="w-10 rounded-full ">
                <Image
                  priority
                  width="40"
                  height="40"
                  alt="Avatar"
                  src={myContext.user.profileImg || "/DefaultProfile.png"}
                />
              </div>
            </div>
            <ul
              tabIndex="0"
              className="mt-44 z-[1] p-2 shadow menu menu-sm dropdown-content rounded-box w-52 bg-primary"
            >
              <li>
                <Link href="/profile"> Profile</Link>
              </li>
              <li>
                <Link href="/upload"> Upload</Link>
              </li>
              <li>
                <Link href="/settings">Settings</Link>
              </li>
              <li>
                <Link
                  href="/"
                  onClick={() => {
                    myContext.LogOut();
                  }}
                >
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <button
              className="btn btn-accent"
              onClick={() => {
                myContext.setToggleLoginPage((prev) => !prev);
              }}
            >
              Log in
            </button>
            <button
              className="btn btn-success max-sm:hidden"
              onClick={() => {
                myContext.setToggleSignUpPage((prev) => !prev);
              }}
            >
              Sign up
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
