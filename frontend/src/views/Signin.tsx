import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { toastify } from "../common/toastify";
import { useAuthContext } from "../hooks/useAuthContext";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signin } = useAuthContext();
  const navigate = useNavigate();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    try {
      await signin(email, password);
      toastify("success", "Successfully logged in");
      navigate("/");
    } catch (error: any) {
      toastify("error", error?.message);
    }
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center max-w-[1000px] min-h-[100vh] mx-auto">
        <div className="w-full p-4 bg-white border border-gray-200 rounded-lg shadow-md sm:p-6 lg:p-8 ">
          <form className="space-y-6" onSubmit={(e) => handleSubmit(e)}>
            <h3 className="text-lg font-medium text-gray-900 md:text-2xl">
              Sign in
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
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Login to your account
            </button>
            <div className="text-sm font-medium text-gray-500">
              Not registered?
              <Link to="/signup" className="ml-1 text-blue-700 hover:underline">
                Create account
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
