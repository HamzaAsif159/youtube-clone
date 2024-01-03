import axios from "axios";

export const userInstance = axios.create({
  baseURL:
    import.meta.env.VITE_NODE_ENV === "development"
      ? "http://localhost:5000/"
      : "https://youtube-clone.up.railway.app/",
  headers: { "Content-Type": "application/json" },
});
