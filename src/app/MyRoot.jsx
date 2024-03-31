"use client";
import Navbar from "@/components/Navbar";
import Login from "@/components/Login.jsx";
import SignUp from "@/components/Signup";
import SideBar from "@/components/SideBar";
import { useMyContext } from "@/context/ContextProvider.jsx";

function MyRoot({ children }) {
  const myContext = useMyContext();

  return (
    <>
      <div className="text-white flex w-auto h-auto">
        <Navbar />
        <div
          className={`relative flex justify-center w-screen min-h-screen bg-neutral-800 top-14 px-2 pt-2 
          ${
            myContext.toggleSidebar
              ? " left-52 max-md:left-0 md:w-[calc(100vw-13rem)] "
              : " left-0 "
          }
          `}
        >
          {children}
        </div>
        {myContext.toggleSidebar && <SideBar />}
        {myContext.toggleLoginPage && <Login />}
        {myContext.toggleSignupPage && <SignUp />}
      </div>
    </>
  );
}

export default MyRoot;
