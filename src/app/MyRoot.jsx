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
      <div className="text-white flex flex-col w-auto min-h-screen">
        <Navbar />
        <div className="min-h-screen flex justify-center">{children}</div>
        <SideBar />
        {myContext.toggleLoginPage && <Login />}
        {myContext.toggleSignUpPage && <SignUp />}
      </div>
    </>
  );
}

export default MyRoot;
