import React from 'react';
import Client from '../assets/client.png';
import { Button } from 'primereact/button';

const NuevoClienteAside = ({ categorias, quantities, calculateTotal, createClient }) => {
  return (
    <aside className='fixed h-full w-56 bg-white border-r-4 flex flex-col items-center justify-start overflow-auto'>
      <h1 className='w-full text-center mt-4 font-bold bg-red-100'>Cliente Nuevo</h1>
      <img src={Client} alt="client" className='mx-auto my-4' />
      <h2 className="text-lg font-bold mb-4">Selección:</h2>
      <ul className="w-full px-4">
        {categorias.flatMap(categoria => 
          categoria.productos.filter(producto => quantities[producto.id] > 0).map(producto => (
            <li key={producto.id} className="flex justify-between items-center mb-2">
              <span className="font-semibold text-base">{producto.nombre}</span>
              <span className="text-nowrap bg-green-300 p-1 font-bold">{quantities[producto.id]} x ${producto.precio.toFixed(2)}</span>
            </li>
          ))
        )}
      </ul>
      <div className="w-full px-4 mb-2">
        <hr className="my-2" />
        <div className="flex justify-between items-center font-bold text-xl">
          <span>Total:</span>
          <span>${calculateTotal().toFixed(2)}</span>
        </div>
      </div>
      <div className="w-full px-4 mt-auto mb-16">
        <Button label="Crear Cliente" onClick={createClient} className="p-button-success p-4 flex items-center justify-center mx-auto bg-blue-500 text-white" />
      </div>
    </aside>
  );
};

export default NuevoClienteAside;
