import React, { useState } from 'react';
import convertirNumero from '../numberToWords.js';
import BagMoney from '../assets/money-bag.png';

function ContadorBilletes() {
  const [billetes, setBilletes] = useState({
    100000: 0,
    50000: 0,
    20000: 0,
    10000: 0,
    5000: 0,
    2000: 0,
    1000: 0,
    500: 0,
    200: 0,
    100: 0,
    50: 0
  });

  const handleChange = (denominacion, valor) => {
    setBilletes((prevBilletes) => ({
      ...prevBilletes,
      [denominacion]: parseInt(valor, 10) || 0
    }));
  };

  const confirmarCaja = () => {
    confirm('Confirmar Apertura de Caja');
  }

  const total = Object.keys(billetes).reduce(
    (acc, denom) => acc + billetes[denom] * denom,
    0
  );

  const totalEnLetras = convertirNumero(total);

  // Función para formatear la fecha
  const formatearFecha = () => {
    const fecha = new Date();
    const dia = String(fecha.getDate()).padStart(2, '0');
    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
    const anio = fecha.getFullYear();
    const horas = String(fecha.getHours()).padStart(2, '0');
    const minutos = String(fecha.getMinutes()).padStart(2, '0');
    const segundos = String(fecha.getSeconds()).padStart(2, '0');
    return `${dia}/${mes}/${anio} ${horas}:${minutos}:${segundos}`;
  };

  return (
    <div className="max-w-screen mx-auto p-8 bg-white border border-gray-300 rounded-lg shadow-lg">
      <div className='grid grid-cols-3 gap-4'>
        <div className='col-span-2 px-4'>
          <div className="grid grid-cols-2 gap-4 border-4 p-4 rounded-xl">
            <h2 className='text-center col-span-2 text-2xl font-extrabold'>Contenido de la Caja</h2>
            {Object.keys(billetes)
              .sort((a, b) => b - a) // Ordena las denominaciones de mayor a menor
              .map((denominacion) => (
                <div
                  key={denominacion}
                  className="flex items-center justify-between p-4 bg-gray-100 rounded-lg shadow-sm hover:bg-gray-200 active:bg-gray-300 transition duration-150 border border-gray-300"
                >
                  <label className="text-lg font-medium text-gray-700">
                    ${denominacion}
                  </label>
                  <input
                    type="number"
                    value={billetes[denominacion]}
                    onChange={(e) => handleChange(denominacion, e.target.value)}
                    className="w-20 p-2 border border-gray-300 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
                    min="0"
                  />
                </div>
              ))}
          </div>
        </div>
        <div className="flex flex-col items-center mt-8">
          <div>
            <h1 className='text-center bg-green-200 font-bold text-2xl p-1 mx-4 mb-6 '>Apertura de la Caja</h1>
            <h3 className='text-2xl font-semibold text-gray-800'>Caja Numero: #</h3>
            <p className="text-2xl font-semibold text-gray-800">Total: ${total}</p>
            <p className="text-lg font-medium text-gray-600 mt-2">
              ({totalEnLetras})
            </p>
            <p className='text-lg font-medium text-gray-600 mt-2 '> Fecha y Hora de Apertura: {formatearFecha()}</p>
            <div className="mt-6 text-center">
              <button
                className="bg-blue-600 text-xl font-bold text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-700 active:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 hover:scale-105 transition duration-150"
                onClick={confirmarCaja} 
              >
                Confirmar
              </button>
              <img src={BagMoney} alt="imagen" className='size-32 mx-auto mt-12 hover:scale-110 duration-200' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContadorBilletes;
