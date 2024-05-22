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

  const testonLogin = async (bodyData: LoginData): Promise<boolean> => {
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
      }
      throw new Error("Something went wrong");
    }
  };
  const onSignup = async (bodyData: SignupData): Promise<boolean> => {
    try {
      const body = {
        name: bodyData.name,
        email: bodyData.email,
        password: bodyData.password,
      };

      const response = await api.post(
        `${BASE_URL}/accounts`,
        JSON.stringify(body)
      );
      toast.success("Account created successfully!");
      return true;
    } catch (error: any) {
      if (error.response.status === 409) {
        toast.error("Email already exists");
        throw new Error("Email already exists");
      } else {
        toast.error("Something went wrong");
        throw new Error("Something went wrong");
      }
    }
  };

  return {
    testonLogin,
    onSignup,
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
