import React, { useId } from "react";

const Input = React.forwardRef(function Input(
  { label, type = "text", className = "", ...props },
  ref,
) {
  const id = useId();
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="block mb-2 text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}

      <input
        id={id}
        ref={ref}
        type={type}
        className={`
        w-full
        px-4
        py-3
        rounded-xl
        border
        border-gray-300
        bg-white
        text-gray-900
        placeholder:text-gray-400
        focus:outline-none
        focus:ring-2
        focus:ring-black
        focus:border-black
        transition-all
        duration-200
        ${className}
      `}
        {...props}
      />
    </div>
  );
});

export default Input;
