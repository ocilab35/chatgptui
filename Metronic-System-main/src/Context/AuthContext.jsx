import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { auth, googleProvider } from "../firebase";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleError = (error) => {
    if (error.response) {
      // Backend responded with an error
      const { status, data } = error.response;
      switch (status) {
        case 400:
          throw new Error(
            data.message || "Invalid input. Please check your details."
          );
        case 401:
          throw new Error(
            data.message || "Unauthorized. Please check your credentials."
          );
        case 409:
          throw new Error(data.message || "Email already in use.");
        case 500:
          throw new Error("Server error. Please try again later.");
        default:
          throw new Error("An unexpected error occurred.");
      }
    } else if (error.code) {
      // Firebase-specific errors
      switch (error.code) {
        case "auth/email-already-in-use":
          throw new Error("This email is already registered. Try signing in.");
        case "auth/invalid-email":
          throw new Error("Invalid email format.");
        case "auth/weak-password":
          throw new Error(
            "Password is too weak. It must be at least 8 characters."
          );
        case "auth/popup-closed-by-user":
          throw new Error("Google sign-in was cancelled.");
        case "auth/network-request-failed":
          throw new Error(
            "Network error. Please check your connection and try again."
          );
        default:
          throw new Error("Google authentication failed.");
      }
    } else {
      // Network or other errors
      throw new Error(
        "Unable to connect to the server. Please check your internet connection."
      );
    }
  };

  const register = async (name, email, password) => {
    try {
      const response = await axios.post("http://localhost:5000/api/signup", {
        name,
        email,
        password,
      });
      setToken(response.data.token);
      setUser(response.data.user);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      return response.data;
    } catch (error) {
      handleError(error);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post("http://localhost:5000/api/signin", {
        email,
        password,
      });
      setToken(response.data.token);
      setUser(response.data.user);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      return response.data;
    } catch (error) {
      handleError(error);
    }
  };

  const googleAuth = async (email, name) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/google-auth",
        {
          email,
          name,
        }
      );
      setToken(response.data.token);
      setUser(response.data.user);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      return response.data;
    } catch (error) {
      handleError(error);
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        register,
        login,
        googleAuth,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
