import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignin = () => {
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const { dispatch } = useAuthContext();

  const signin = async (email, password) => {
    setLoading(true);
    setError(null);

    const response = await fetch(
      "https://youtube-clone.up.railway.app/user/login",
      {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ email, password }),
      }
    );

    const json = await response.json();

    if (!response.ok) {
      setLoading(false);
      setError(json.error);
    }

    if (response.ok) {
      localStorage.setItem("user", JSON.stringify(json));

      dispatch({ type: "LOGIN", payload: json });

      setLoading(false);
    }
  };

  return { signin, loading, error };
};
