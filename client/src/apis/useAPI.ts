import axios from "axios";
import { toast } from "react-toastify";

export const useAPI = () => {
  const BASE_URL = "https://investment-app-api.onrender.com";
  const api = axios.create({
    baseURL: BASE_URL,
    headers: {
      "Content-Type": "application/json",
                  'Access-Control-Allow-Origin': '*',
                  'Access-Control-Allow-Headers': '*',
                  'Access-Control-Allow-Credentials': 'true'
    },
    withCredentials: true,
  });


  api.interceptors.response.use(
    function (response) {
      // Any status code that lies within the range of 2xx causes this function to trigger
      return response;
    },
    function (error) {
      // Any status code that falls outside the range of 2xx causes this function to trigger
      // Do something with response error
      if (error.response) {
        const status = error.response.status;
        console.log('Interceptor error response:', error.response); // Debugging line

        if (status === 400) {
          toast.error("No update data provided!");
        } else if (status === 401) {
          toast.error("Unauthorized access");
        } else if (status === 403) {
          toast.error("Invalid credentials");
        } else if (status === 409) {
          toast.error("Email already exists");
        } else if (status === 412) {
          toast.error("User not found");
        } else if (status === 413) {
          toast.error("Failed to insert investment")
        } else if (status === 500) {
          toast.error("An internal server error occurred");
        } else {
          toast.error("An unexpected error occurred");
        }
      } else {
        toast.error("Network error");
      }

      return Promise.reject(error);
    }
  );


  const handleLogin = async (bodyData: LoginData): Promise<boolean> => {
    const body = {
      email: bodyData.email,
      password: bodyData.password,
    };

    await api.post("/login", body);
    toast.success("Login successful!");
    return true;

  };

  const handleSignup = async (bodyData: SignupData): Promise<boolean> => {
    const body = {
      name: bodyData.name,
      email: bodyData.email,
      password: bodyData.password,
    };

    await api.post("/accounts", body);
    toast.success("Account created successfully!");
    return true;
  };

  const handleLogout = async (): Promise<boolean> => {
    await api.post("/logout");
    toast.success("Successfully logged out!");
    return true;
  };

  const handleEdit = async (bodyData: EditData): Promise<boolean> => {
    const body = {
      name: bodyData.name,
      email: bodyData.currentEmail,
      ...(bodyData.newEmail &&
        bodyData.newEmail !== bodyData.currentEmail && {
        newEmail: bodyData.newEmail,
      }),
      ...(bodyData.newPassword && { newPassword: bodyData.newPassword }),
    };

    const response = await api.put("/updateAccount", body);
    const data = response.data;
    toast.success(data.message || "Profile updated successfully!");
    return true;
  };
  const handleInvest = async (bodyData: InvestData): Promise<boolean> => {
    const body = {
      email: bodyData.email,
      opprtunityId: bodyData.opprtunityId,
      amountToInvest: bodyData.amountToInvest
    };
    console.log("heeerrrrree");

    await api.post("/invest", body);
    toast.success("Congratulations to invest!");
    return true;
  }

  return {
    handleLogin,
    handleSignup,
    handleLogout,
    handleEdit,
    handleInvest
  };
};

export type LoginData = {
  email: string;
  password: string;
};
export type SignupData = {
  email: string;
  name: string;
  password: string;
};
export type EditData = {
  name: string;
  currentEmail: string;
  newEmail?: string;
  newPassword?: string;
};

export type InvestData = {
  email: string;
  opprtunityId: number;
  amountToInvest: number;
};
