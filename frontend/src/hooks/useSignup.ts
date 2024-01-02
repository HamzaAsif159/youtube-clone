import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const { dispatch } = useAuthContext();

  const signup = async (username, email, password) => {
    const response = await fetch("http://localhost:5000/user/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });

    const json = await response.json();

    if (!response.ok) {
      throw new Error(json?.message);
    }

    if (response.ok) {
      localStorage.setItem("user", JSON.stringify(json));

      dispatch({ type: "LOGIN", payload: json });
    }
  };

  return { signup };
};
