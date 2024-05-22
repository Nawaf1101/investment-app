import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/useAccountStore";
import { LoginData, SignupData, useAPI } from "../apis/useAPI";
import { onLogOut } from "../functionalities/AccountsFunctions";
const useAccount = () => {
  const navigate = useNavigate();
  const { isLoggedIn, user, setLogin, setLogout, setUser } = useAuthStore();
  const { testonLogin, onSignup } = useAPI();

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
          setUser(data.name, data.email);
          setLogin();
        } else {
          console.log("No active session found.");
        }
      })
      .catch((err) => {
        console.error("Error fetching data:", err); // Log errors to the console
      });
  }, [isLoggedIn, setUser, setLogin]);

  const handleLogOut = async (event) => {
    let isLoggedOut = await onLogOut();
    if (isLoggedOut) {
      setLogout();
    }
  };

  const handleSignUp = async (
    name: string,
    email: string,
    password: string
  ) => {
    try {
      const signupData: SignupData = { email, name, password };
      let isAccountCreated = await onSignup(signupData);
      if (isAccountCreated) {
        setLogin();
        navigate("/");
      }
    } catch (error: any) {}
  };

  const handleLogIn = async (email: string, password: string) => {
    const loginData: LoginData = { email, password };
    try {
      let status = await testonLogin(loginData);

      if (status) {
        setLogin();
        navigate("/");
      }
    } catch (error: any) {}
  };

  return {
    handleLogOut,
    user,
    setUser,
    isLoggedIn,
    handleSignUp,
    handleLogIn,
  };
};

export default useAccount;
