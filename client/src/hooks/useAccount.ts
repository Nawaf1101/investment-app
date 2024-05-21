import { useEffect, useState } from "react";
import {
  onLogOut,
  validate,
  onSignup,
  onLogin,
} from "../functionalities/AccountsFunctions";
import { useNavigate } from "react-router-dom";

const useAccount = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState({ name: "", email: "" });

  useEffect(() => {
    fetch("http://localhost:3001/getSession", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => {
        if (res.ok) {
          // Check if the response status is 2xx
          return res.json();
        } else {
          throw new Error("Network response was not ok.");
        }
      })
      .then((data) => {
        if (data.valid) {
          setUser({ name: data.name, email: data.email });
          setLoggedIn(true);
        } else {
          console.log("No active session found.");
        }
      })
      .catch((err) => {
        console.error("Error fetching data:", err); // Log errors to the console
      });
  }, [isLoggedIn]);

  const handleLogOut = async (event) => {
    if (await onLogOut()) {
      setLoggedIn(false);
    }
  };

  const handleSignUp = async (
    name: string,
    email: string,
    password: string
  ) => {
    let isAccountCreated = await onSignup(name, email, password);
    if (isAccountCreated) {
      setLoggedIn(true);
      navigate("/");
    }
  };

  const handleLogIn = async (email: string, password: string) => {
    let isLoginSuccessfully: boolean = await onLogin(email, password);
    if (isLoginSuccessfully) {
      setLoggedIn(true);
      navigate("/");
    }
  };

  return {
    handleLogOut,
    user,
    setUser,
    isLoggedIn,
    setLoggedIn,
    handleSignUp,
    handleLogIn,
  };
};

export default useAccount;
