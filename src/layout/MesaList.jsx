import MesaImagen from '../assets/mesa.png';
import React, { useState, useEffect } from 'react';
import mesasData from '../data/mesas.json';

const MesaList = () => {
  const [mesas, setMesas] = useState([]);

  useEffect(() => {
    // Simular la carga de datos desde un archivo JSON
    setMesas(mesasData);
  }, []);

  return (
    <div className="p-6 bg-gray-100 h-full">
      <h2 className="text-2xl font-bold mb-6">Lista de Mesas</h2>
      <div className="grid grid-cols-3 gap-8 my-12">
        {mesas.map((mesa) => (
          <div key={mesa.codigo} className='relative group border rounded-xl'>
            <img src={MesaImagen} alt="" className='w-28 mx-auto place-items-center items-center justify-center' /> 
            <div className="hidden group-active:block p-4 bg-white shadow-md rounded ">
              <h3 className="text-xl font-semibold">Mesa {mesa.codigo}</h3>
              <p><strong>Hora Ocupado:</strong> {new Date(mesa.horaOcupado).toLocaleString()}</p>
              <p><strong>Valor Acumulado:</strong> ${mesa.valorAcumulado.toFixed(2)}</p>
              <h4 className="mt-2 font-semibold">Productos:</h4>
              <ul className="list-disc list-inside ml-4">
                {mesa.productos.map((producto, index) => (
                  <li key={index}>{producto.nombre} - ${producto.precio.toFixed(2)}</li>
                ))}
              </ul>
            </div>
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 font-bold">{mesa.codigo}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MesaList;



