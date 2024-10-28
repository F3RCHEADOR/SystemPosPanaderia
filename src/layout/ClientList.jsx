import React, { useState, useEffect } from 'react';
import { useDrag } from 'react-dnd';
import ClientInfo from '../components/Home/infoClient';
import clienteImagen from "../assets/client.png";

const backend = import.meta.env.VITE_BUSINESS_BACKEND;

const ItemTypes = {
  CLIENT: 'client',
};

const Client = ({ cliente, selectedCliente, onClientClick }) => {


  
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.CLIENT,
    item: cliente,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }), [cliente]);

  return (
    <div
      ref={drag}
      className={`relative p-4 w-28 h-32 z-0 font-bold text-gray-700 cursor-pointer bg-white shadow-md rounded mx-auto transition-all ${isDragging ? 'opacity-50' : ''}`}
    >
      <button onClick={() => onClientClick(cliente.codigo)}>
        <img src={clienteImagen} alt={cliente.codigo} className="w-20 mx-auto transition-all" />
      </button>
      <h2 className="text-base font-semibold mb-2 text-center">{cliente.codigo}</h2>

      {selectedCliente === cliente.codigo && (
        <ClientInfo
          cliente={cliente}
          onClose={() => onClientClick(null)}
        />
      )}
    </div>
  );
};

const ClientList = ({ onDropCliente, onEditClient  }) => {
  const [clientes, setClientes] = useState([]);
  const [selectedCliente, setSelectedCliente] = useState(null);

  useEffect(() => {
    fetch(backend+'api/clientes')
      .then(response => response.json())
      .then(data => setClientes(data))
      .catch(error => console.error('Error al cargar los clientes:', error));
  }, []);

  const handleClientClick = (codigo) => {
    setSelectedCliente(selectedCliente === codigo ? null : codigo);
  };



  return (
    <div className="fixed overflow-y-auto p-4 xl:p-6 bg-gray-100  xl:min-h-screen border-r-4 w-32 xl:w-56">
      <h1 className="text-2xl font-bold mb-6 text-center">Clientes</h1>
      <div className="space-y-8 mt-12">
        {clientes.map((cliente) => (
          <Client
            key={cliente.codigo}
            cliente={cliente}
            selectedCliente={selectedCliente}
            onClientClick={handleClientClick}
          />
        ))}
      </div>
    </div>
  );
};

export default ClientList;
