import React, { useState, useEffect } from 'react';
import clientesData from '../data/cliente.json'; // Asegúrate de que la ruta sea correcta
import clienteImagen from '../assets/client.png';

const ClientList = () => {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    // Simular la carga de datos desde un archivo JSON
    setClientes(clientesData);
  }, []);

  return (
    <div className="fixed overflow-y-auto p-6 bg-gray-100 max-h-full min-h-screen border-r-4 w-56">
      <h1 className="text-3xl font-bold mb-6 text-center">Clientes</h1>
      <div className="space-y-6">
        {clientes.map((cliente) => (
          <div key={cliente.codigo} className="relative mb-4 p-4 w-28 h-32 z-2 font-bold text-gray-700  bg-white shadow-md rounded group mx-auto hover:h-44">
            <img src={clienteImagen} alt={cliente.codigo} className='w-20 mx-auto' />
            <h2 className="text-base font-semibold mb-2 text-center">{cliente.codigo}</h2>

            <div className='absolute hidden group-hover:block z-10 top-0 w-48 -translate-x-10 h-auto left-0 p-1 pb-4 rounded-xl bg-white border-4 ' >
              <p className="text-gray-600 mb-2 text-center">Hora: {cliente.horaLlegada}</p>
              <ul className="space-y-1 mb-2">
                {cliente.productos.map((producto, index) => (
                  <li key={index} className="flex justify-between p-2  bg-gray-50 rounded">
                    <span>{producto.nombre}</span>
                    <span>${producto.precio.toFixed(2)}</span>
                  </li>
                ))}
              </ul>
              <div className="flex justify-between font-semibold border-4 p-1 rounded-xl">
                <span>Total:</span>
                <span>${cliente.valorAcumulado.toFixed(2)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClientList;
