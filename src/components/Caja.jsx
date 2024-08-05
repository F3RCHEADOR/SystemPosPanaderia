import React from "react";
import cliente from "../assets/client.png";

function Caja() {
  return (
    <div>
      <div className="flex bg-white items-center justify-center "><img src={cliente} alt="" className="size-16" /></div>
      <div className="grid grid-cols-4 w-full h-8">
        <div className="col-span-1 border-4 bg-slate-300 "></div>
        <div className="col-span-2 border-4 bg-slate-300"></div>
        <div className="col-span-1 border-4 bg-slate-300"></div>

      </div>
    </div>
  )
}

export default Caja;