import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center">
        <h1 className="text-8xl font-extrabold text-black">404</h1>

        <h2 className="mt-4 text-3xl font-bold text-gray-900">
          Page Not Found
        </h2>

        <p className="mt-3 text-gray-500 max-w-md mx-auto">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>

        <Link
          to="/"
          className="
            inline-block
            mt-8
            px-6
            py-3
            rounded-xl
            bg-black
            text-white
            font-medium
            hover:bg-gray-800
            transition
          "
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
