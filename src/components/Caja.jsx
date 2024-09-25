import React, { useState, useEffect } from "react";
import CajaRegistradora from "../assets/cashRegister.png";
import Money from "../assets/money.png";
import Inventory from "../assets/inventory.png";
import Client from "../assets/client.png";
import Ventas from "../assets/ventas.png";
import { Link } from "react-router-dom";


const backend = import.meta.env.VITE_BUSINESS_BACKEND;


function Caja() {

  const [isMenuVisibe, setIsMenuVisible] = useState(false);
  const [tipoCaja, setTipoCaja] = useState(null); // Inicializa el estado de tipoCaja

  useEffect(() => {
    const obtenerEstadoCaja = async () => {
      try {
        const response = await fetch(`${backend}api/caja`); // Espera la respuesta
        if (!response.ok) throw new Error('Error al obtener el estado de la caja');

        const data = await response.json();
        console.log(data);

        // Obtén el último registro
        const ultimoRegistro = data[data.length - 1];
        console.log(ultimoRegistro);

        // Determina el tipo de caja para la siguiente operación
        if (ultimoRegistro) {
          setTipoCaja(ultimoRegistro.tipoCaja === 'apertura' ? 'Cerrar' : 'Abrir');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Ocurrió un error al verificar el estado de la caja');
      }
    };

    obtenerEstadoCaja(); // Ejecuta la función para obtener el estado de la caja
  }, []); // Se ejecuta solo una vez cuando el componente se monta

  const toogleMenu = () => {
    setIsMenuVisible(!isMenuVisibe);
  }

  return (
    <div>
      <div className="relative flex  bg-white items-center justify-center "><button onClick={toogleMenu}><img src={CajaRegistradora} alt="" className="size-20" /></button>
        <div className={`${isMenuVisibe ? 'block' : 'hidden'} absolute bg-white translate-y-20 mt-20 w-[550px] h-44 border-4 rounded-xl p-2 z-20`}>
          <div className="grid grid-cols-4 gap-4 font-bold text-sm text-center">
            <Link to="/AddClient" className="border-4 p-1 rounded-xl hover:scale-110 duration-200"><img src={Client} alt="pago" className="size-20 mx-auto" /><span >Agregar Cliente</span></Link>
            <Link to="/ContadorBilletes" className={`${tipoCaja === 'Abrir' ? 'bg-blue-300' : 'bg-red-300'} border-4 p-1 rounded-xl hover:scale-110 duration-200`}><img src={Money} alt="pago" className="size-20 mx-auto" /><span >{tipoCaja} Caja</span></Link>
            <Link to="/Ventas" className="border-4 p-1 rounded-xl hover:scale-110 duration-200"><img src={Ventas} alt="Ventas" className="size-20 mx-auto" /><span >Ventas</span></Link>
            <Link to="/Inventories" className="border-4 p-1 rounded-xl hover:scale-110 duration-200"><img src={Inventory} alt="pago" className="size-20 mx-auto" /><span >Agregar Inventario</span></Link>
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