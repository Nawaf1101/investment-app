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

  const onLogin = async (bodyData: LoginData): Promise<boolean> => {
    try {
      const body = {
        email: bodyData.email,
        password: bodyData.password,
      };

      const response = await api.post("/login", body);
      toast.success("Login successful!");
      return true;
    } catch (error: any) {
      if (error.response && error.response.status) {
        if (error.response.status === 403) {
          toast.error("Invalid credentials!");
          throw new Error("Invalid credentials");
        } else if (error.response.status === 401) {
          toast.error("User not found!");
          throw new Error("User not found");
        }
      } else {
        toast.error("Something went wrong");
        throw new Error("Something went wrong");
      }
    }
  };

  const onSignup = async (bodyData: SignupData): Promise<boolean> => {
    try {
      const body = {
        name: bodyData.name,
        email: bodyData.email,
        password: bodyData.password,
      };

      const response = await api.post("/accounts", body);
      toast.success("Account created successfully!");
      return true;
    } catch (error: any) {
      if (error.response && error.response.status === 409) {
        toast.error("Email already exists");
        throw new Error("Email already exists");
      } else {
        toast.error("Something went wrong");
        throw new Error("Something went wrong");
      }
    }
  };

  const onLogOut = async (): Promise<boolean> => {
    try {
      const response = await api.post("/logout");
      toast.success("Successfully logged out!");
      return true;
    } catch (error: any) {
      toast.error("Something went wrong");
      return false;
    }
  };

  const onEdit = async (bodyData: EditData): Promise<boolean> => {
    try {
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
    } catch (error: any) {
      if (error.response) {
        toast.error(error.response.data.message || "Something went wrong");
        throw new Error(error.response.data.message || "Something went wrong");
      } else {
        toast.error("Something went wrong");
        throw new Error("Something went wrong");
      }
    }
  };

  return {
    onLogin,
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
