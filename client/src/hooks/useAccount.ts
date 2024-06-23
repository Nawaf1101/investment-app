import { useEffect } from "react";
import useAuthStore from "../store/useAccountStore";
import { useAPI } from "../apis/useAPI";

const useAccount = () => {
  const { isLoggedIn, user, setLogin, setLogout, setUser } = useAuthStore();
  const { handleLogout } = useAPI();
  useEffect(() => {
    fetch("https://investment-app-api.onrender.com/getSession", {
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
  }, [setUser, setLogin, setLogout]);
  const handleLogOut = async (event: any) => {
    let isLoggedOut = await handleLogout();
    if (isLoggedOut) {
      setLogout();
    }
  };


  return {
    handleLogOut,
    user,
    setUser,
    isLoggedIn,
  };
};

export default useAccount;
