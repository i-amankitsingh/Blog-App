import React, { useState } from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";

function LogoutBtn() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const logoutHandler = async () => {
    setLoading(true);
    try {
      await authService.logout();

      dispatch(logout());

      navigate("/login");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      disabled={loading}
      onClick={logoutHandler}
      className="
    rounded-xl
    bg-red-500
    px-5
    py-2
    font-medium
    text-white
    transition
    hover:bg-red-600
    disabled:opacity-50
    disabled:cursor-not-allowed
  "
    >
      {loading ? "Logging out..." : "Logout"}
    </button>
  );
}

export default LogoutBtn;
