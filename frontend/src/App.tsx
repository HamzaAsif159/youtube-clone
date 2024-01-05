import { Routes, Route, Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";

import "./App.css";
import PrivateRoute from "./utils/PrivateRoute";
import Main from "./views/Main";
import Signin from "./views/Signin";
import Signup from "./views/Signup";
import Watch from "./views/Watch";
import { useAuthContext } from "./hooks/useAuthContext";

function App() {
  const { user } = useAuthContext();

  return (
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<Main />} />
        <Route path="/watch" element={<Watch />} />
      </Route>
      <Route element={user ? <Navigate to="/" /> : <Outlet />}>
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
      </Route>
    </Routes>
  );
}

export default App;
