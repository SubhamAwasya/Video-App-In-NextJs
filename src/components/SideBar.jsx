"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { sideBarLinks } from "@/utils/constant";
import { BiLogOut } from "react-icons/bi";
import { useMyContext } from "@/context/ContextProvider.jsx";

function SideBar() {
  const currentPathname = usePathname();
  const myContext = useMyContext();
  return (
    <>
      <div className="drawer z-50">
        <input
          id="my-drawer"
          type="checkbox"
          className="btn btn-primary drawer-toggle"
        />
        <div className="drawer-side">
          <label
            htmlFor="my-drawer"
            aria-label="close sidebar"
            className="drawer-overlay "
          ></label>
          <ul className="menu p-4 w-60 md:w-80 min-h-full bg-base-200 text-base-content ">
            <label
              htmlFor="my-drawer"
              className="btn drawer-button btn-circle self-end"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </label>

            {sideBarLinks.map((item, i) => (
              <li
                key={i}
                className={`drawer-button rounded-md ${
                  currentPathname === `${item.url}`
                    ? "bg-error"
                    : "hover:bg-neutral-600"
                }`}
              >
                <Link href={item.url}>
                  <span className="text-xl">{item?.icon}</span>
                  {item.title}
                </Link>
              </li>
            ))}

            {myContext.user && (
              <>
                <hr></hr>
                <li className={`drawer-button rounded-md `}>
                  <Link
                    href={"/"}
                    onClick={() => {
                      myContext.LogOut();
                    }}
                  >
                    <span className="text-xl">
                      <BiLogOut />
                    </span>
                    Log Out
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </>
  );
}

export default SideBar;
