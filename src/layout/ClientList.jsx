// src/layout/ClientList.jsx
import React, { useState, useEffect } from 'react';
import { useDrag } from 'react-dnd';
import ClientInfo from '../components/infoClient';
import clienteImagen from "../assets/client.png";

const ItemTypes = {
  CLIENT: 'client',
};

const Client = ({ cliente, onDropCliente }) => {
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
      <img src={clienteImagen} alt={cliente.codigo} className="w-20 mx-auto transition-all" />
      <h2 className="text-base font-semibold mb-2 text-center">{cliente.codigo}</h2>
    </div>
  );
};

const ClientList = ({ onDropCliente }) => {
  const [clientes, setClientes] = useState([]);
  const [selectedCliente, setSelectedCliente] = useState(null);

  useEffect(() => {
    // Realiza la solicitud para obtener los clientes
    fetch('http://localhost:5000/api/clientes')
      .then(response => response.json())
      .then(data => setClientes(data))
      .catch(error => console.error('Error al cargar los clientes:', error));
  }, []);

  const handleClienteClick = (codigo) => {
    setSelectedCliente(selectedCliente === codigo ? null : codigo);
  };

  const clienteSeleccionado = clientes.find(cliente => cliente.codigo === selectedCliente);

  return (
    <div className="fixed overflow-y-auto p-6 bg-gray-100 max-h-full min-h-screen border-r-4 w-56">
      <h1 className="text-3xl font-bold mb-6 text-center">Clientes</h1>
      <div className="space-y-8 mt-12">
        {clientes.map((cliente) => (
          <Client
            key={cliente.codigo}
            cliente={cliente}
            onDropCliente={onDropCliente}
          />
        ))}
      </div>
      {clienteSeleccionado && (
        <ClientInfo
          cliente={clienteSeleccionado}
          onClose={() => setSelectedCliente(null)}
        />
      )}
    </div>
  );
};

export default ClientList;
