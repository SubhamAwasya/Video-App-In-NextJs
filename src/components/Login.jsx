"use client";

// icons
import { useMyContext } from "@/context/ContextProvider.jsx";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { GrClose } from "react-icons/gr";

function Login({ prop }) {
  const myContext = useMyContext();
  const [isLoading, setIsLoading] = useState(false);
  const [infoText, setInfoText] = useState({});

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    setInfoText({});
    // Define the data to be sent in the request body
    const requestData = {
      email: e.target.email.value,
      password: e.target.password.value,
    };

    // Define the options for the fetch request
    const requestOptions = {
      method: "POST", // You can change this to 'GET', 'PUT', 'DELETE', etc. as needed
      headers: {
        "Content-Type": "application/json", // Set the appropriate content type
        // Add any other headers if required
      },
      body: JSON.stringify(requestData), // Convert the data to a JSON string
    };

    // Make the fetch request
    fetch("/api/auth/login", requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Network response was not ok. Status: ${response.status}`
          );
        }
        return response.json(); // Parse the response body as JSON
      })
      .then((res) => {
        // Handle the data returned from the server
        setIsLoading(false);
        if (res.message == "Login successful") {
          myContext.LogIn(res.data);
        } else {
          setInfoText(res);
        }
      })
      .catch((error) => {
        setIsLoading(false);
        console.error("Error fetching data:", error);
      });
  }

  return (
    <div className="w-full h-screen text-white fixed top-0 left-0 flex items-center justify-center z-50">
      <form
        className="flex flex-col items-center gap-1 bg-base-100 px-10 pb-10 rounded-xl "
        onSubmit={handleSubmit}
      >
        <button
          className="relative w-6 h-6 left-[135px] top-[10px] flex justify-center items-center rounded-full border-2 border-transparent hover:border-white    hover:border-2
       "
          onClick={(e) => {
            e.preventDefault();
            myContext.setToggleLoginPage((prev) => !prev);
          }}
        >
          <GrClose />
        </button>
        <h1 className="text-[3rem] mb-6">LogIn</h1>
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
          </svg>
          <input
            required
            type="text"
            className="grow"
            placeholder="Email"
            name="email"
          />
        </label>

        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>
          <input
            required
            type="password"
            className="grow"
            name="password"
            placeholder="Password"
          />
        </label>

        <button
          className="btn btn-accent w-full"
          disabled={isLoading}
          type="submit"
        >
          {!isLoading ? (
            "Login"
          ) : (
            <span className="loading loading-spinner text-info"></span>
          )}
        </button>
        <button className="btn btn-outline w-full" disabled={isLoading}>
          <FcGoogle />
          Google
        </button>
        <span className="mt-2">{infoText.message}</span>
        <span className="mt-2">
          Not have account !&nbsp;
          <span
            className="cursor-pointer text-blue-500 underline"
            onClick={() => {
              myContext.setToggleLoginPage(false);
              myContext.setToggleSignUpPage(true);
            }}
          >
            SignUp
          </span>
        </span>
      </form>
      {/*transparent bg*/}
      <div className="absolute w-full h-screen bg-black -z-10 opacity-90"></div>
    </div>
  );
}

export default Login;
