import React from "react";

function ButtonCalculator({ value, onClick }) {
  return (
    <button
      className="p-2.5 w-24 rounded-xl bg-gray-300 border-4 hover:scale-110 active:bg-gray-100 duration-75 font-semibold text-center mx-auto"
      onClick={onClick}
    >
      <span>{value}</span>
    </button>
  );
}

export default ButtonCalculator;
