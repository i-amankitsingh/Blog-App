import React, { useId } from "react";

function Select({ options, label, className = "", ...props }, ref) {
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

      <select
        id={id}
        ref={ref}
        className={`
        w-full
        px-4
        py-3
        rounded-xl
        border
        border-gray-300
        bg-white
        text-gray-900
        focus:ring-2
        focus:ring-black
        focus:border-black
        outline-none
        transition-all
        duration-200
        ${className}
      `}
        {...props}
      >
        {options?.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default React.forwardRef(Select);
