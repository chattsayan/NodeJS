import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/login`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      // console.log(res.data);
      dispatch(addUser(res.data));
      return navigate("/");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong!");
      // console.error(err?.response?.data);
    }
  };

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/signup`,
        {
          firstName,
          lastName,
          email,
          password,
        },
        { withCredentials: true }
      );

      // console.log(res?.data?.data);
      dispatch(addUser(res?.data?.data));
      return navigate("/profile");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong!");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="card card-side bg-base-300 shadow-xl w-auto flex items-center justify-center px-3 py-5 ">
        <div>
          <h1 className="text-center font-bold text-2xl">
            {isLogin ? "Login" : "Sign Up"}
          </h1>
          <div className="card-body">
            {/* ----- FOR SIGNUP ----- */}
            {!isLogin && (
              <>
                <label className="input input-bordered flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="h-4 w-4 opacity-70"
                  >
                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                  </svg>
                  <input
                    type="text"
                    className="grow"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </label>

                <label className="input input-bordered flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="h-4 w-4 opacity-70"
                  >
                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                  </svg>
                  <input
                    type="text"
                    className="grow"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </label>
              </>
            )}

            {/* ----- FOR LOGIN ----- */}
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>
              <input
                type="text"
                className="grow"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>

            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                type={showPassword ? "text" : "password"}
                className="grow"
                value={password}
                placeholder="********"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)} // Toggle the state
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.98 8.137C5.154 6.568 8.063 4.5 12 4.5c3.938 0 6.846 2.068 8.02 3.637m-16.04 0a19.29 19.29 0 0 0-1.682 3.054c-.34.68-.34 1.438 0 2.118.487.976 1.244 2.06 2.13 3.054m16.04-8.226a19.29 19.29 0 0 1 1.682 3.054c.34.68.34 1.438 0 2.118-.487.976-1.244 2.06-2.13 3.054M8.625 15.75a3.375 3.375 0 1 1 6.75 0 3.375 3.375 0 0 1-6.75 0z"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.98 8.137C5.154 6.568 8.063 4.5 12 4.5c3.938 0 6.846 2.068 8.02 3.637m-16.04 0a19.29 19.29 0 0 0-1.682 3.054c-.34.68-.34 1.438 0 2.118.487.976 1.244 2.06 2.13 3.054m16.04-8.226a19.29 19.29 0 0 1 1.682 3.054c.34.68.34 1.438 0 2.118-.487.976-1.244 2.06-2.13 3.054M8.625 15.75a3.375 3.375 0 1 1 6.75 0 3.375 3.375 0 0 1-6.75 0z"
                    />
                  </svg>
                )}
              </button>
            </label>
          </div>
          <p className="text-red-500 text-center">{error}</p>

          <p
            className="cursor-pointer mb-5 text-center text-sm"
            onClick={() => setIsLogin((value) => !value)}
          >
            {isLogin ? "New User? SignUp here!" : "Existing User? Login here"}
          </p>

          <div className="card-actions justify-evenly">
            <button
              className="btn btn-primary"
              onClick={isLogin ? handleLogin : handleSignUp}
            >
              {isLogin ? "Sign In" : "Sign Up"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
