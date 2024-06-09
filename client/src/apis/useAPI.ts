import axios from "axios";
import { toast } from "react-toastify";

export const useAPI = () => {
  const BASE_URL = "http://localhost:3001";
  const api = axios.create({
    baseURL: BASE_URL,
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });


  axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  }, function (error) {
    if (error.response.status === 400) {
      toast.error("No update data provided!");
    } else if (error.response.status === 401) {
      toast.error("Unauthorized access");
    } else if (error.response.status === 403) {
      toast.error("Invalid credentials")
    } else if (error.response.status === 409) {
      toast.error("Email already exists")
    } else if (error.response.status === 412) {
      toast.error("User not found")
    } else if (error.response.status === 500) {
      toast.error("An internal server error occurred")
    }
    return Promise.reject(error.response.message);
  });


  const handleLogin = async (bodyData: LoginData): Promise<boolean> => {
    const body = {
      email: bodyData.email,
      password: bodyData.password,
    };

    const response = await api.post("/login", body);
    toast.success("Login successful!");
    return true;

  };

  const onSignup = async (bodyData: SignupData): Promise<boolean> => {
    const body = {
      name: bodyData.name,
      email: bodyData.email,
      password: bodyData.password,
    };

    const response = await api.post("/accounts", body);
    toast.success("Account created successfully!");
    return true;
  };

  const onLogOut = async (): Promise<boolean> => {
    const response = await api.post("/logout");
    toast.success("Successfully logged out!");
    return true;
  };

  const onEdit = async (bodyData: EditData): Promise<boolean> => {
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

  return {
    handleLogin,
    onSignup,
    onLogOut,
    onEdit,
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
