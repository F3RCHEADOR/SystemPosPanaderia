// ClientInfo.js
import React from 'react';
import clienteImagen from '../assets/client.png';
import ButtonPayment from './ButtonPayment';
import ButtonEditClient from './ButtonEditClient';

const ClientInfo = ({ cliente, onClose }) => {
  if (!cliente) return null;

  return (
    <div className="fixed z-50 top-20 left-48 w-60 h-auto max-h-80 overflow-auto p-4 bg-white border-4 shadow-lg rounded-xl">
      <button onClick={onClose} className="absolute top-2 right-2 text-gray-900 font-bold rounded-full p-2 bg-red-200">X</button>
      <img src={clienteImagen} alt={cliente.codigo} className="w-16 mx-auto" />
      <p className="text-gray-600 mb-2 text-center bg-red-100">Hora: {cliente.horaLlegada}</p>
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
      <ButtonEditClient cliente={cliente} />
      <ButtonPayment />
    </div>
  );
};

export default ClientInfo;
