// InfoAsideVentas.js
import React, { useState, useEffect } from 'react';
import ClienteImagen from "../assets/ventas.png";
import InvoiceVentas from "./InvoiceVentas";

const InfoAsideVentas = ({ info, onClose }) => {
  const [imprimir, setImprimir] = useState(false); // Estado para controlar la impresión


  const handleImprimir = () => {
    setImprimir(true);
  };

  // Reset the print flag after printing
  useEffect(() => {
    if (imprimir) {
      // Here, you would need to reset the `imprimir` state in InvoiceInventory after print
      // For simplicity, this example assumes `InvoiceInventory` handles resetting itself.
      const timer = setTimeout(() => {
        setImprimir(false);
      }, 3000); // Adjust the timeout duration as needed

      return () => clearTimeout(timer);
    }
  }, [imprimir]);

  return (
    <div className="absolute z-50 top-36 left-0 w-60 h-auto max-h-96 overflow-auto p-4 bg-white border-4 shadow-lg rounded-xl">
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-gray-900 font-bold rounded-full p-2 bg-red-200"
      >
        X
      </button>
      <img src={ClienteImagen} alt={info.codigo} className="w-16 mx-auto" />
      <h1>Caja Primera Apertura</h1>
      <p>{info.ultimaApertura}</p>

      <div className="border-4 mb-2">
        <div className="flex justify-between font-semibold border-4 p-1 rounded-xl">
          <span>Clientes: {info.clientesHoy}</span>
          <span>Pagos: {info.pagosHoy}</span>
        </div>
        <div className="grid grid-cols-3 p-1">
          <span className="col-span-2 text-left">Gastos:</span>
          <span className="text-center">${info.totalGastos}</span>
          <span className="col-span-2 text-left">Ventas:</span>
          <span className="text-center">${info.totalVentas}</span>
          <span className="col-span-2 text-left">Total Venta:</span>
          <span className="text-center">${info.verdaderaVentasAcumuladas}</span>
        </div>
      </div>

      <button
        onClick={handleImprimir}
        className="px-2.5 py-2 m-2 bg-green-300 font-bold border-4"
      >
        Imprimir
      </button>

      <div className="flex items-center justify-center mx-auto">
        {imprimir && <InvoiceVentas ventasData={info} imprimir={true} />}
      </div>
    </div>
  );
};

export default InfoAsideVentas;
