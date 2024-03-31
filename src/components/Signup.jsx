import React, { useState } from "react";
import { useMyContext } from "@/context/ContextProvider.jsx";
import { GrClose } from "react-icons/gr";

function Login({ prop }) {
  const myContext = useMyContext();
  const [isLoading, setIsLoading] = useState(false);
  const [infoText, setInfoText] = useState({});

  function handleSubmit(e) {
    setIsLoading(true);
    setInfoText({ message: "Loading..." });
    e.preventDefault();
    // Define the data to be sent in the request body
    const requestData = {
      name: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };
    // Define the options for the fetch request
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Set the appropriate content type
        // Add any other headers if required
      },
      body: JSON.stringify(requestData), // Convert the data to a JSON string
    };

    // Make the fetch request
    fetch(process.env.NEXT_PUBLIC_SIGNUP, requestOptions)
      .then((response) => {
        return response.json(); // Parse the response body as JSON
      })
      .then((data) => {
        // Handle the data returned from the server
        console.log("Response data:", data);
        setIsLoading(false);
        setInfoText(data);
      })
      .catch((error) => {
        setIsLoading(false);
        setInfoText(error);
        console.error("Error fetching data:", error);
      });
  }

  return (
    <div className="w-full h-screen text-white fixed top-0 left-0 flex items-center justify-center z-50">
      <form
        className="flex flex-col gap-1 items-center bg-neutral-800 px-10 pb-10 rounded-xl "
        onSubmit={handleSubmit}
      >
        <button
          className="relative w-6 h-6 left-[135px] top-[10px] flex justify-center items-center rounded-full border-2 border-transparent hover:border-white    hover:border-2
       "
          onClick={(e) => {
            e.preventDefault();
            myContext.setToggleSignupPage((prev) => !prev);
          }}
        >
          <GrClose />
        </button>
        <h1 className="text-[3rem] mb-6">SignUp</h1>
        <input
          required
          name="name"
          type="text"
          placeholder="Name"
          className="p-2 inputAutoFill outline-none bg-neutral-800 border-neutral-400 border-b-2"
        />
        <input
          required
          name="email"
          type="email"
          placeholder="Email"
          className="p-2 outline-none bg-neutral-800  border-neutral-400 border-b-2"
        />
        <input
          required
          name="password"
          type="password"
          placeholder="Password"
          className="p-2 outline-none bg-neutral-800  border-neutral-400 border-b-2"
        />

        <button
          className="p-2 w-32 h-12 rounded-xl bg-neutral-600 border-2 border-transparent hover:border-white mt-5 hover:border-2 disabled:border-0 disabled:opacity-60 disabled:cursor-not-allowed
      "
          disabled={isLoading}
          type="submit"
        >
          {!isLoading ? (
            "SignUp"
          ) : (
            <div className="dot-container relative top-3">
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
            </div>
          )}
        </button>
        <span className="mt-2">{infoText.message}</span>
        <span className="mt-2">
          Already have account !&nbsp;
          <span
            className="cursor-pointer text-blue-500 underline"
            onClick={() => {
              myContext.setToggleLoginPage(true);
              myContext.setToggleSignupPage(false);
            }}
          >
            SignIn
          </span>
        </span>
      </form>
      {/*transparent bg*/}
      <div className="absolute w-full h-screen bg-black -z-10 opacity-90"></div>
    </div>
  );
}

export default Login;
