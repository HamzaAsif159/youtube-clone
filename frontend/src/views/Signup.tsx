import React, { FormEvent } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { toastify } from "../common/toastify";
import { useAuthContext } from "../hooks/useAuthContext";

export default function Signup() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [username, setUsername] = React.useState("");
  const { signup } = useAuthContext();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await signup(username, email, password);
      toastify("success", "Successfully signed up");
      navigate("/");
    } catch (error: any) {
      toastify("error", error?.message);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center max-w-[1000px] min-h-[100vh] mx-auto">
        <div className="w-full p-4 bg-white border border-gray-200 rounded-lg shadow-md sm:p-6 lg:p-8 ">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <h3 className="text-lg font-medium text-gray-900 md:text-2xl">
              Sign up
            </h3>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Your email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="name@company.com"
                required
              />
            </div>
            <div>
              <label
                htmlFor="username"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Your username
              </label>
              <input
                type="text"
                name="username"
                id="email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="user123"
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Your password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Create your account
            </button>
            <div className="text-sm font-medium text-gray-500 ">
              already have an account?
              <Link to="/" className="ml-1 text-blue-700 hover:underline">
                login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
