// InfoAsideVentas.js
import React from 'react';
import ClienteImagen from '../assets/ventas.png';

const InfoAsideVentas = ({ info, onClose }) => {

  console.log(info);

  return (
    <div className="absolute z-50 top-36 left-0 w-60 h-auto max-h-96 overflow-auto p-4 bg-white border-4 shadow-lg rounded-xl">
      <button onClick={onClose} className="absolute top-2 right-2 text-gray-900 font-bold rounded-full p-2 bg-red-200">X</button>
      <img src={ClienteImagen} alt={info.codigo} className="w-16 mx-auto" />
      <h1>Caja Primera Apertura</h1>
      <p>{info.ultimaApertura}</p>

      <div className='border-4 mb-2'>
        <div className="flex justify-between font-semibold border-4 p-1 rounded-xl">
          <span>Clientes: {info.clientesHoy}</span>
          <span>Pagos: {info.pagosHoy}</span>
        </div>
        <div className='grid grid-cols-3 p-1'>
          <span className='col-span-2 text-left'>
           Gastos:
          </span>
          <span className='text-center'>
            ${info.totalGastos}
          </span>
          <span className='col-span-2 text-left'>
            Ventas:
          </span>
          <span className='text-center'>
            ${info.totalVentas}
          </span>
          <span className='col-span-2 text-left'>
            Total Venta:
          </span>
          <span className='text-center'>
            ${info.verdaderaVentasAcumuladas}
          </span>
        </div>
      
      </div>

      <button className='bg-green-300 p-2 m-1 rounded-xl font-bold border-4 '>Imprimir</button>
    </div>
  );
};

export default InfoAsideVentas;
