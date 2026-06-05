import React from "react";

function Button({
  children,
  type = "button",
  bgColor = "bg-blue-600",
  textColor = "white",
  className = "",
  ...props
}) {
  return (
    <button
      type={type}
      className={`
      w-fit
      px-6
      py-3
      rounded-xl
      bg-black
      text-white
      font-medium
      text-sm
      transition-all
      duration-300
      hover:scale-[1.02]
      hover:shadow-lg
      active:scale-95
      disabled:opacity-50
      disabled:cursor-not-allowed
      ${className}
    `}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
