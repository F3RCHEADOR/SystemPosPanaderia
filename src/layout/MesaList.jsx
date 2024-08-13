// src/components/MesaList.jsx
import React, { useState, useEffect } from 'react';
import mesasData from '../data/mesas.json';
import MesaImagen from '../assets/mesa.png';
import InfoMesa from '../components/infoMesa';

const MesaList = ({ onClienteDrop }) => {
  const [mesas, setMesas] = useState([]);
  const [selectedMesa, setSelectedMesa] = useState(null);

  useEffect(() => {
    setMesas(mesasData);
  }, []);

  const handleMesaClick = (codigo) => {
    setSelectedMesa(selectedMesa === codigo ? null : codigo);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.currentTarget.classList.add('scale-110', 'bg-gray-100');
  };

  const handleDragLeave = (e) => {
    e.currentTarget.classList.remove('scale-110', 'bg-gray-100');
  };

  const handleDrop = (e, mesa) => {
    e.preventDefault();
    e.currentTarget.classList.remove('scale-110', 'bg-gray-100');
    e.currentTarget.classList.add('bg-green-200');

    const clienteData = JSON.parse(e.dataTransfer.getData('application/json'));

    // Actualiza los datos de la mesa con la información del cliente
    setMesas(mesas.map(m =>
      m.codigo === mesa.codigo
        ? {
          ...m,
          horaOcupado: clienteData.horaLlegada,
          productos: clienteData.productos,
          valorAcumulado: clienteData.valorAcumulado
        }
        : m
    ));

    // Notificar que el cliente ha sido movido
    onClienteDrop(clienteData.codigo);
  };

  const mesaSeleccionada = mesas.find(mesa => mesa.codigo === selectedMesa);

  return (
    <div className="p-6 bg-gray-100 h-full w-full">
      <div className='flex items-center justify-between'>
        <h2 className="text-2xl font-bold mb-6 text-center">Lista de Mesas</h2>
        <div><span className='p-2.5 rounded-full w-4 h-4 bg-green-400 mx-2 font-bold'>Ocupado</span>
          </div>

      </div>
      <div className="grid grid-cols-3 max-w-screen-xl mx-auto gap-8 my-12">
        {mesas.map((mesa) => (
          <div
            key={mesa.codigo}
            className="relative border rounded-xl p-4"
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, mesa)}
          >
            <button
              className="flex items-center justify-center w-full"
              onClick={() => handleMesaClick(mesa.codigo)}
            >
              <img src={MesaImagen} alt={`Mesa ${mesa.codigo}`} className="w-28 mx-auto transition-all" />
            </button>

            {selectedMesa === mesa.codigo && (
               <InfoMesa
               mesa={mesaSeleccionada}
               onClose={() => setSelectedMesa(null)}
             />
            )}

            <div className="absolute top-8 left-1/2 transform -translate-x-1/2 font-bold">{mesa.codigo}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MesaList;
