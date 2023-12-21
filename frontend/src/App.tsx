import { Routes, Route } from "react-router-dom";
import "./App.css";
import Main from "./views/Main";
import Signin from "./views/Signin";
import Signup from "./views/Signup";

function App() {
  return (
    <>
      <Routes>
        <Route path="/home" element={<Main />} />
        <Route path="/" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;
