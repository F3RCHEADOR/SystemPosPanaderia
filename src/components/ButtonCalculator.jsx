import React from "react";

function ButtonCalculator({ value, onClick }) {
  return (
    <button
      className="text-white font-bold w-16 h-12 border-4 bg-gray-800 rounded-xl  border-gray-300 "
      onClick={onClick}
    >
      <span className="flex items-center justify-center mx-auto text-center">{value}</span>
    </button>
  );
}

export default ButtonCalculator;
