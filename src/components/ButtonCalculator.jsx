import React from "react";

function ButtonCalculator({value}){
  return (
    
      <button className="p-2.5 w-24 rounded-xl bg-gray-300 border-4 hover:scale-110 duration-75 font-semibold text-center mx-auto"><span>{value}</span></button>
    
  )
}

export default ButtonCalculator;