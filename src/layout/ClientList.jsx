import React, { useState, useEffect } from 'react';
import ClientInfo from '../components/infoClient'; // Asegúrate de que el nombre de archivo es correcto
import clienteImagen from "../assets/client.png";

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

  const handleDragStart = (e, cliente) => {
    e.dataTransfer.setData('application/json', JSON.stringify(cliente));
    e.target.classList.add('scale-125', 'bg-gray-100', 'rotate-12'); // Agregar estilos para el arrastre
  };

  const handleDragEnd = (e) => {
    e.target.classList.remove('scale-125', 'bg-gray-100', 'rotate-12'); // Restaurar estilos después del arrastre
  };

  const handleClienteDrop = (codigo) => {
    // Manejar la caída del cliente en una mesa
    setClientes(prevClientes => prevClientes.filter(cliente => cliente.codigo !== codigo));
    setSelectedCliente(null);

    if (onDropCliente) {
      onDropCliente(codigo); // Notificar al padre que el cliente ha sido soltado
    }
  };

  const clienteSeleccionado = clientes.find(cliente => cliente.codigo === selectedCliente);

  return (
    <div className="fixed overflow-y-auto p-6 bg-gray-100 max-h-full min-h-screen border-r-4 w-56">
      <h1 className="text-3xl font-bold mb-6 text-center">Clientes</h1>
      <div className="space-y-8 mt-12">
        {clientes.map((cliente) => (
          <div
            key={cliente.codigo}
            className={`relative p-4 w-28 h-32 z-0 font-bold text-gray-700 cursor-pointer bg-white shadow-md rounded mx-auto transition-all`}
            draggable
            onDragStart={(e) => handleDragStart(e, cliente)}
            onDragEnd={handleDragEnd}
            onClick={() => handleClienteClick(cliente.codigo)}
            onDrop={(e) => handleClienteDrop(cliente.codigo)}
            onDragOver={(e) => e.preventDefault()} // Permitir que el drop ocurra
          >
            <img src={clienteImagen} alt={cliente.codigo} className="w-20 mx-auto transition-all" />
            <h2 className="text-base font-semibold mb-2 text-center">{cliente.codigo}</h2>
          </div>
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
