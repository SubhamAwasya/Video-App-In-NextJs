"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { sideBarLinks } from "@/constant";
import { BiLogOut } from "react-icons/bi";
import { useMyContext } from "@/context/ContextProvider.jsx";

function SideBar() {
  const currentPathname = usePathname();
  const myContext = useMyContext();
  return (
    <div className="bg-neutral-900 fixed left-0 top-14 z-50 w-52 text-white h-screen p-4">
      <div className="w-full h-full flex flex-col gap-1">
        {sideBarLinks.map((item, i) => (
          <Link
            key={i}
            href={item.url}
            className={`w-full h-10 px-2 gap-2 flex items-center rounded-xl border-2 border-transparent  hover:border-2 ${
              currentPathname === `${item.url}`
                ? "bg-red-600"
                : "hover:bg-neutral-600"
            }`}
          >
            <span className="text-2xl">{item?.icon}</span>
            {item.title}
          </Link>
        ))}
        <hr></hr>
        <Link
          href={"/"}
          className={`w-full h-10 px-2 gap-2 flex items-center rounded-xl border-2 border-transparent  hover:border-2 
          `}
          onClick={myContext.LogOut}
        >
          <span className="text-2xl">
            <BiLogOut />
          </span>
          LogOut
        </Link>
      </div>
    </div>
  );
}

export default SideBar;
