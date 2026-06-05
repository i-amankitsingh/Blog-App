import React, { useState } from "react";
import authService from "../appwrite/auth";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../store/authSlice";
import { Button, Input, Logo } from "./index.js";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const create = async (data) => {
    setError("");
    try {
      const userData = await authService.createAccount(data);
      if (userData) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(login(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">
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
          Create Account
        </h1>

        <p className="text-center text-gray-500 mt-2">
          Start publishing your blogs today
        </p>

        {error && (
          <div className="mt-4 p-3 rounded-xl bg-red-50 text-red-600 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(create)} className="mt-8 space-y-5">
          <Input
            label="Full Name"
            placeholder="John Doe"
            {...register("name")}
          />

          <Input
            label="Email Address"
            type="email"
            placeholder="john@example.com"
            {...register("email")}
          />

          <Input
            label="Password"
            type="password"
            placeholder="Create password"
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
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-black hover:underline"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
