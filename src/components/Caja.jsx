import React from "react";
import CajaRegistradora from "../assets/cashRegister.png";
import Money from "../assets/money.png";
import Inventory from "../assets/inventory.png";
import Client from "../assets/client.png";


function Caja() {
  return (
    <div>
      <div className="relative flex my-2.5 bg-white items-center justify-center "><img src={CajaRegistradora} alt="" className="size-20" />
        <div className="absolute bg-white translate-y-20 mt-20 w-[450px] h-44 border-4 rounded-xl p-2">
          <div className="grid grid-cols-3 gap-4 font-bold text-sm text-center">
            <div><img src={Client} alt="pago" className="size-24 mx-auto" /><span >Crear Cliente</span></div>
            <div><img src={Money} alt="pago" className="size-24 mx-auto" /><span >Pagar</span></div>
            <div className="border-4"><img src={Inventory} alt="pago" className="size-24 mx-auto" /><span >Agregar Inventario</span></div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-4 w-full h-8 my-2.5">
        <div className="col-span-1 border-4 bg-slate-300 "></div>
        <div className="col-span-2 border-4 bg-slate-300"></div>
        <div className="col-span-1 border-4 bg-slate-300"></div>
      </div>
    </div>
  )
}

export default Caja;