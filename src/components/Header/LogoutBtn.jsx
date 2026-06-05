import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";

function LogoutBtn() {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout());
    });
  };

  return (
    <button
      className="
rounded-xl
bg-red-500
px-5
py-2
font-medium
text-white
transition
hover:bg-red-600
"
      onClick={logoutHandler}
    >
      Logout
    </button>
  );
}

export default LogoutBtn;
