"use client";
import React from "react";
import { useState, useEffect, useContext, createContext } from "react";

const Context = createContext(null);

export const useMyContext = () => useContext(Context);

function ContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [toggleLoginPage, setToggleLoginPage] = useState(false);
  const [toggleSignupPage, setToggleSignupPage] = useState(false);
  const [toggleSidebar, setToggleSidebar] = useState(false);

  async function LogOut() {
    window.localStorage.removeItem("isLoggedIn");
    fetch(process.env.NEXT_PUBLIC_LOGOUT)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Network response was not ok. Status: ${response.status}`
          );
        }
        return response.json(); // Parse the response body as JSON
      })
      .then((res) => {
        setUser(null);

        console.log("LogOut Success");
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }
  async function LogIn(user) {
    setUser(user);
    setToggleLoginPage(false);
    setToggleSignupPage(false);
    window.localStorage.setItem("isLoggedIn", true);
  }
  async function TokenLogin() {
    fetch(process.env.NEXT_PUBLIC_TOKEN_LOGIN)
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
        LogIn(res.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  useEffect(() => {
    if (window.localStorage.getItem("isLoggedIn")) {
      TokenLogin();
    }
    if (!user) window.localStorage.removeItem("isLoggedIn");
  }, []);

  return (
    <Context.Provider
      value={{
        user,
        LogIn,
        LogOut,
        toggleLoginPage,
        setToggleLoginPage,
        toggleSignupPage,
        setToggleSignupPage,
        toggleSidebar,
        setToggleSidebar,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export default ContextProvider;
