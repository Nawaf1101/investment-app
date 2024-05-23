import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/useAccountStore";
import { LoginData, SignupData, EditData, useAPI } from "../apis/useAPI";

const useAccount = () => {
  const { isLoggedIn, user, setLogin, setLogout, setUser } = useAuthStore();
  const { onLogin, onSignup, onLogOut, onEdit } = useAPI();
  const navigate = useNavigate();
  useEffect(() => {
    fetch("http://localhost:3001/getSession", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          setLogout();
          throw new Error("Network response was not ok.");
        }
      })
      .then((data) => {
        if (data.valid) {
          setUser(data.name, data.email);
          setLogin();
        } else {
          setLogout();
          console.log("No active session found.");
        }
      })
      .catch((err) => {
        setLogout();
        console.error("Error fetching data:", err);
      });
  }, [setUser, setLogin]);
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
      let status = await onLogin(loginData);

      if (status) {
        setLogin();
        navigate("/");
      }
    } catch (error: any) {}
  };

  const handelEditProfile = async (
    name: string,
    currentEmail: string,
    newEmail: string,
    newPassword: string
  ) => {
    const editData: EditData = { name, currentEmail, newEmail, newPassword };
    try {
      let status = await onEdit(editData);
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
    handelEditProfile,
  };
};

export default useAccount;
