import React from "react";

function Logo({ width = "100px" }) {
  return (
    <div
      style={{ width }}
      className="
      flex
      items-center
      justify-center
      h-12
      rounded-xl
      bg-black
      text-white
      font-bold
      text-xl
      tracking-wide
    "
    >
      Blogify
    </div>
  );
}

export default Logo;
