import { toast } from "react-toastify";
import Joi from "joi";

const schema = Joi.object({
  name: Joi.string().min(3).required().messages({
    "string.empty": "Name is required",
    "string.min": "Name must be at least 3 characters long",
    "any.required": "Name is required",
  }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.email": "Invalid email format",
      "string.empty": "Email is required",
      "any.required": "Email is required",
    }),
  password: Joi.string().min(8).required().messages({
    "string.min": "Password must be at least 8 characters long",
    "string.empty": "Password is required",
    "any.required": "Password is required",
  }),
});

export function validate(
  email: string,
  password: string,
  name: string = "anonymous"
) {
  const options = { abortEarly: false }; // Include all errors, not just the first
  const { error } = schema.validate({ name, email, password }, options);
  if (!error) return null;

  const validationErrors = {};
  for (let item of error.details) {
    validationErrors[item.path[0]] = item.message;
  }
  return validationErrors;
}

export async function onSignup(name: string, email: string, password: string) {
  try {
    const response = await fetch("http://localhost:3001/accounts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ name, email, password }),
    });
    if (!response.ok) {
      if (response.status === 409) {
        throw new Error("Email already exists");
      } else {
        throw new Error("Something went wrong");
      }
    }
    await response.json();
    toast.success("Account created successfully!");
    return true;
  } catch (error) {
    toast.error(error.message);
    return false;
  }
}

export async function onLogin(email: string, password: string) {
  try {
    const response = await fetch("http://localhost:3001/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      if (response.status === 403) {
        throw new Error("Invalid credentials");
      } else if (response.status === 401) {
        throw new Error("User not found");
      } else {
        throw new Error("Something went wrong");
      }
    }
    await response.text();
    toast.success("Login successful!");
    return true;
  } catch (error) {
    toast.error(error.message);
    return false;
  }
}

export async function onLogOut() {
  try {
    const response = await fetch("http://localhost:3001/logout", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      throw new Error("Something went wrong");
    }
    toast.success("Successfully logged out!");
    return true;
  } catch (error) {
    toast.error(error.message);
    return false;
  }
}

export async function onEdit(
  name: string,
  currentEmail: string,
  newEmail: string,
  newPassword: string
) {
  const requestBody = {
    name: name,
    email: currentEmail,
    ...(newEmail && newEmail !== currentEmail && { newEmail: newEmail }),
    ...(newPassword && { newPassword: newPassword }),
  };

  try {
    const response = await fetch("http://localhost:3001/updateAccount", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(requestBody),
    });
    if (!response.ok) {
      const data = await response.json();
      toast.error(
        data.message || "An unexpected error occurred. Please try again."
      );
      return false;
    }
    const data = await response.json();
    toast.success(data.message || "Profile updated successfully!");
    return true;
  } catch (error) {
    console.error("Error updating profile:", error);
    return false;
  }
}
