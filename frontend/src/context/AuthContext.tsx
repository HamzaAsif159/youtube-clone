import { createContext, useState, ReactNode } from "react";

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
  signin: (email: string, password: string) => void;
  signup: (username: string, email: string, password: string) => void;
  logout: () => void;
}>({
  user: null,
  signin: () => {},
  signup: () => {},
  logout: () => {},
});

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthResponse | null>(() => {
    const user = localStorage.getItem("user");

    return user ? (JSON.parse(user) as AuthResponse) : null;
  });

  const signin = async (email: string, password: string) => {
    const response = await fetch(
      "https://youtube-clone.up.railway.app/user/login",
      {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ email, password }),
      }
    );

    const json: AuthResponse = await response.json();

    if (!response.ok && "message" in json) {
      throw new Error(json?.message as string);
    }

    if (response.ok) {
      localStorage.setItem("user", JSON.stringify(json));
      setUser(json);
    }
  };

  const signup = async (username: string, email: string, password: string) => {
    const response = await fetch(
      "https://youtube-clone.up.railway.app/user/signup",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      }
    );

    const json = await response.json();

    if (!response.ok) {
      throw new Error(json?.message);
    }

    if (response.ok) {
      localStorage.setItem("user", JSON.stringify(json));
      setUser(json);
    }
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
