import { Outlet, Navigate } from "react-router-dom";

import { useAuthContext } from "../hooks/useAuthContext";

const PrivateRoute = () => {
  const { user } = useAuthContext();

  return user ? <Outlet /> : <Navigate to="/signin" />;
};

export default PrivateRoute;
