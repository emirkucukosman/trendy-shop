import React, { useEffect, useState } from "react";
import { useReduxDispatch, useReduxSelector } from "src/app/hook";
import {
  login,
  clearErrors,
  selectLoginError,
  selectLoginStatus,
} from "src/slices/authSlice";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Container from "src/components/Container";
import LoadingScreen from "src/components/LoadingScreen";

const LoginView = () => {
  const dispatch = useReduxDispatch();
  const loginError = useReduxSelector(selectLoginError);
  const loginStatus = useReduxSelector(selectLoginStatus);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(login({ username, password }));
  };

  useEffect(() => {
    if (loginError) {
      toast(loginError, { type: "error", position: "bottom-center" });
      dispatch(clearErrors());
    }
  }, [loginError, dispatch]);

  return (
    <Container maxWidth="lg" className="mt-4">
      <form onSubmit={handleLoginSubmit}>
        <div className="flex flex-col">
          <h1 className="text-3xl">Log In</h1>
          <div className="flex flex-col mt-4 shadow-md p-6">
            {loginStatus !== "loading" ? (
              <>
                <label htmlFor="username">Username:</label>
                <input
                  type="text"
                  name="trendy-username"
                  placeholder="Username"
                  className="border-none outline-none bg-gray-200 rounded-md px-4 py-2 mt-1 transition duration-200 focus-within:bg-gray-300"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <label htmlFor="password" className="mt-4">
                  Password:
                </label>
                <input
                  type="password"
                  name="trendy-password"
                  placeholder="Password"
                  className="border-none outline-none bg-gray-200 rounded-md px-4 py-2 mt-1 transition duration-200 focus-within:bg-gray-300"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="flex flex-col items-start md:items-end mt-6">
                  <button
                    type="submit"
                    className="w-full md:w-max bg-blue-500 text-white px-5 py-2 rounded-md transition duration-200 hover:bg-blue-600 focus:outline-none"
                  >
                    Log In
                  </button>
                  <span className="text-sm mt-2">
                    Don't have an account?{" "}
                    <Link
                      to="/account/register"
                      className="text-blue-500 hover:underline"
                    >
                      Register here
                    </Link>
                  </span>
                </div>
              </>
            ) : (
              <LoadingScreen />
            )}
          </div>
        </div>
      </form>
      <ToastContainer />
    </Container>
  );
};

export default LoginView;
