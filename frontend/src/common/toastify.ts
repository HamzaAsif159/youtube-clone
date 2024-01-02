import { ToastOptions, toast } from "react-toastify";

export const toastify = (type: "success" | "error", message: string) => {
  const config = {
    position: "bottom-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  } satisfies ToastOptions;

  toast[type](message, config);
};
