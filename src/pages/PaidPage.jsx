import React, { useState, useEffect } from 'react';
import Client from '../assets/client.png';
import { useLocation } from 'react-router-dom';
import CalculatorPanel from '../components/Calculadora';


const PaidPage = () => {
  const location = useLocation();
  const { clientData } = location.state || {};


  return (
    <>
      <aside className='fixed h-full w-56 -mt-4 bg-white border-r-4 flex flex-col items-center justify-start overflow-auto'>
        <h1 className='w-full text-center mt-4 font-bold bg-red-100'>
          Cliente Pagando
        </h1>
        <img src={Client} alt="client" className='mx-auto my-4' />
        <h2 className="text-lg font-bold mb-4">Selección:</h2>
        <ul className="w-full px-4">
          {clientData && clientData.productos && clientData.productos.length > 0 ? (
            clientData.productos.map((producto, index) => (   
              <li key={index} className="flex justify-between items-center mb-2">
                <span className="font-semibold text-base">{producto.nombre}</span>
                <span className="text-nowrap bg-green-300 p-1 font-bold">
                  {producto.cantidad} x ${producto.precio}
                </span>
              </li>
            ))
          ) : (
            <li>No hay productos seleccionados</li>
          )}
        </ul>
        <div className="w-full px-4 mb-2">
          <hr className="my-2" />
          <div className="flex justify-between items-center font-bold text-xl">
            <span>Total:</span>
            <span>{clientData?.valorAcumulado}</span>
          </div>
        </div>
      </aside>


      <section className='ml-60  px-1 xl:px-4'>
  
       <CalculatorPanel clientData={clientData} />

      </section>
    </>
  );
};

export default PaidPage;
