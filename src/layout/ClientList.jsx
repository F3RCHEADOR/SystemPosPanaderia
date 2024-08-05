import React, { useState, useEffect } from 'react';
import clientesData from '../data/cliente.json';
import clienteImagen from '../assets/client.png';

const ClientList = () => {
  const [clientes, setClientes] = useState([]);
  const [selectedCliente, setSelectedCliente] = useState(null);

  useEffect(() => {
    setClientes(clientesData);
  }, []);

  const handleClienteClick = (codigo) => {
    setSelectedCliente(selectedCliente === codigo ? null : codigo);
  };

  return (
    <div className="fixed overflow-y-auto p-6 bg-gray-100 max-h-full min-h-screen border-r-4 w-56 group">
      <h1 className="text-3xl font-bold mb-6 text-center">Clientes</h1>
      <div className="space-y-8 group-hover:space-y-16 mt-12">
        {clientes.map((cliente) => (
          <div
            key={cliente.codigo}
            className={`relative p-4 w-28 h-32 z-0 font-bold text-gray-700 bg-white shadow-md rounded mx-auto transition-all `}
            onClick={() => handleClienteClick(cliente.codigo)}
          >
            <img src={clienteImagen} alt={cliente.codigo} className="w-20 mx-auto" />
            <h2 className="text-base font-semibold mb-2 text-center">{cliente.codigo}</h2>

            {selectedCliente === cliente.codigo && (
              <div className="absolute z-10 -top-4 left-1/2 transform -translate-x-1/2 w-48 h-52 overflow-auto p-4 bg-white border-4 shadow-lg rounded-xl">
                <p className="text-gray-600 mb-2 text-center bg-red-100 ">Hora: {cliente.horaLlegada}</p>
                <ul className="space-y-1 mb-2">
                  {cliente.productos.map((producto, index) => (
                    <li key={index} className="flex justify-between p-2 bg-gray-50 rounded">
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
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClientList;
