import { useAuthContext } from "./useAuthContext";

export const useSignin = () => {
  const { dispatch } = useAuthContext();

  const signin = async (email, password) => {
    const response = await fetch("http://localhost:5000/user/login", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ email, password }),
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

  return { signin };
};
