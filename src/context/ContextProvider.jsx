"use client";
import React from "react";
import { useState, useEffect, useContext, createContext } from "react";

const Context = createContext(null);

export const useMyContext = () => useContext(Context);

function ContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [toggleLoginPage, setToggleLoginPage] = useState(false);
  const [toggleSignUpPage, setToggleSignUpPage] = useState(false);

  async function LogOut() {
    fetch("/api/auth/logout")
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
        window.localStorage.removeItem("user");
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }
  async function LogIn(user) {
    setUser(user);
    setToggleLoginPage(false);
    setToggleSignUpPage(false);
    window.localStorage.setItem("user", JSON.stringify(user));
  }

  useEffect(() => {
    if (window.localStorage.getItem("user")) {
      setUser(JSON.parse(window.localStorage.getItem("user")));
    }
  }, []);

  return (
    <Context.Provider
      value={{
        user,
        LogIn,
        LogOut,
        toggleLoginPage,
        setToggleLoginPage,
        toggleSignUpPage,
        setToggleSignUpPage,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export default ContextProvider;
