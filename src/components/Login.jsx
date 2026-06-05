import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import { Button, Input, Logo } from "../components/index";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const login = async (data) => {
    setError("");
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        console.log("User Data", userData);
        if (userData) {
          dispatch(authLogin(userData));
        }
        navigate("/");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div
        className="
        w-full
        max-w-md
        bg-white
        rounded-3xl
        shadow-xl
        border
        border-gray-200
        p-8
      "
      >
        <div className="flex justify-center mb-6">
          <Logo width="140px" />
        </div>

        <h1 className="text-3xl font-bold text-center text-gray-900">
          Welcome Back
        </h1>

        <p className="text-center text-gray-500 mt-2">Sign in to continue</p>

        {error && (
          <div className="mt-4 p-3 rounded-xl bg-red-50 text-red-600 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(login)} className="mt-8 space-y-5">
          <Input
            label="Email Address"
            type="email"
            placeholder="abc@example.com"
            {...register("email")}
          />

          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            {...register("password")}
          />

          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-lg justify-center"
          >
            Sign In
          </button>
        </form>

        <p className="text-center text-gray-500 mt-6">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="font-semibold text-black hover:underline"
          >
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
