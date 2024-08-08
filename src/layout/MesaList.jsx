// src/components/MesaList.jsx
import React, { useState, useEffect } from 'react';
import mesasData from '../data/mesas.json';
import InfoMesa from '../components/infoMesa'; // Importa el nuevo componente
import MesaImagen from '../assets/mesa.png';

const MesaList = () => {
  const [mesas, setMesas] = useState([]);
  const [selectedMesa, setSelectedMesa] = useState(null);

  useEffect(() => {
    setMesas(mesasData);
  }, []);

  const handleMesaClick = (codigo) => {
    setSelectedMesa(selectedMesa === codigo ? null : codigo);
  };

  const mesaSeleccionada = mesas.find(mesa => mesa.codigo === selectedMesa);

  return (
    <div className="p-6 bg-gray-100 h-full w-full">
      <h2 className="text-2xl font-bold mb-6 text-center">Lista de Mesas</h2>
      <div className="grid grid-cols-3 max-w-screen-xl mx-auto gap-8 my-12">
        {mesas.map((mesa) => (
          <div key={mesa.codigo} className='relative border rounded-xl'>
            <button className='flex items-center justify-center w-full' onClick={() => handleMesaClick(mesa.codigo)}>
              <img src={MesaImagen} alt="" className='w-28 mx-auto' />
            </button>

            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 font-bold">{mesa.codigo}</div>
          </div>
        ))}
      </div>
      {mesaSeleccionada && (
        <InfoMesa
          mesa={mesaSeleccionada}
          onClose={() => setSelectedMesa(null)}
        />
      )}
    </div>
  );
};

export default MesaList;
