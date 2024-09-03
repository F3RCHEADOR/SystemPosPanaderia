import React, { useState } from "react";
import CajaRegistradora from "../assets/cashRegister.png";
import Money from "../assets/money.png";
import Inventory from "../assets/inventory.png";
import Client from "../assets/client.png";
import Ventas from "../assets/ventas.png";

function Caja() {

  const [isMenuVisibe, setIsMenuVisible] = useState(false);

  const toogleMenu = () => {  
    setIsMenuVisible(!isMenuVisibe);
  }

  return (
    <div>
      <div className="relative flex  bg-white items-center justify-center "><button onClick={toogleMenu}><img src={CajaRegistradora} alt="" className="size-20" /></button>
        <div className={`${isMenuVisibe ? 'block' : 'hidden'} absolute bg-white translate-y-20 mt-20 w-[550px] h-44 border-4 rounded-xl p-2 z-20`}>
          <div className="grid grid-cols-4 gap-4 font-bold text-sm text-center">
            <a href="/AddClient" className="border-4 p-1 rounded-xl hover:scale-110 duration-200"><img src={Client} alt="pago" className="size-20 mx-auto" /><span >Agregar Cliente</span></a>
            <a href="/ContadorBilletes" className="border-4 p-1 rounded-xl hover:scale-110 duration-200"><img src={Money} alt="pago" className="size-20 mx-auto" /><span >Cierre o Apertura de caja</span></a>
            <a href="#" className="border-4 p-1 rounded-xl hover:scale-110 duration-200"><img src={Ventas} alt="Ventas" className="size-20 mx-auto" /><span >Ventas</span></a>
            <a href="#" className="border-4 p-1 rounded-xl hover:scale-110 duration-200"><img src={Inventory} alt="pago" className="size-20 mx-auto" /><span >Agregar Inventario</span></a>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-4 w-full h-8 my-1">
        <div className="col-span-1 border-4 bg-slate-300 "></div>
        <div className="col-span-2 border-4 bg-slate-300"></div>
        <div className="col-span-1 border-4 bg-slate-300"></div>
      </div>
    </div>
  )
}

export default Caja;