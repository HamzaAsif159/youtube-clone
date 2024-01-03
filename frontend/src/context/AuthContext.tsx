import axios, { AxiosError } from "axios";
import { createContext, useState, ReactNode } from "react";
import { userInstance } from "../common/axiosInstance";

type User = {
  username: string;
  email: string;
  password: string;
};

type AuthResponse = {
  user: User;
  token: string;
};

export const AuthContext = createContext<{
  user: AuthResponse | null;
  signin: (email: string, password: string) => Promise<void>;
  signup: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
} | null>(null);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthResponse | null>(() => {
    const user = localStorage.getItem("user");

    return user ? (JSON.parse(user) as AuthResponse) : null;
  });

  const signin = async (email: string, password: string): Promise<void> => {
    const response = await userInstance.post<AuthResponse>("/user/login", {
      email,
      password,
    });

    const data = response?.data;

    localStorage.setItem("user", JSON.stringify(data));
    setUser(data);
  };

  const signup = async (username: string, email: string, password: string) => {
    const response = await userInstance.post<AuthResponse>("/user/signup", {
      username,
      email,
      password,
    });

    const data = response?.data;

    localStorage.setItem("user", JSON.stringify(data));
    setUser(data);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signin, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
