import React, { useEffect, useState } from 'react';
import { useDrop } from 'react-dnd';
import InfoMesa from '../components/infoMesa';
import Reloj from '../components/Reloj';
import axios from 'axios';

const ItemTypes = {
  CLIENT: 'client',
};

const backend = import.meta.env.VITE_BUSINESS_BACKEND;
const localId = localStorage.getItem('localId');

const Mesa = ({ mesa, selectedMesa, onMesaClick }) => {
  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: ItemTypes.CLIENT,
    canDrop: () => mesa.estado !== 'Ocupado',
    drop: (item) => {
      // Manejar la lógica al soltar un cliente en la mesa
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }), [mesa]);

  const mesaBackgroundColor = mesa.estado === 'Ocupado' ? 'bg-red-300' : 'bg-green-200';

  return (
    <div ref={drop} className={`relative border-2 rounded-xl p-6 h-auto ${mesaBackgroundColor}`}>
      <button className="flex items-center justify-center w-full" onClick={() => onMesaClick(mesa._id)}>
        <img src={mesa.imagen} alt={`Mesa ${mesa._id}`} className="w-24 xl:w-32 p-1 bg-white rounded-xl mx-auto transition-all shadow-md" />
      </button>
      {selectedMesa === mesa._id && <InfoMesa mesa={mesa} onClose={() => onMesaClick(null)} />}
      <div className="absolute top-2 right-2 p-1 m-1 bg-gray-800 text-white rounded-full font-bold capitalize">{mesa.nombre}</div>
      <div className={`absolute bottom-1 border-2 italic border-white left-2 px-4 m-1 ${mesa.estado === 'libre' ? 'bg-green-500' : 'bg-red-500'} rounded-full font-bold text-white capitalize`}>
        {mesa.estado === 'libre' ? 'Libre' : 'Ocupado'}
      </div>
    </div>
  );
};

const MesaList = () => {
  const [mesas, setMesas] = useState([]);
  const [selectedMesa, setSelectedMesa] = useState(null);
  const [tipoCaja, setTipoCaja] = useState(null);
  const [pisos, setPisos] = useState([]);
  const [selectedPiso, setSelectedPiso] = useState(null);

  useEffect(() => {
    const obtenerEstadoCaja = async () => {
      try {
        const response = await axios.get(`${backend}api/cajas/ultima-caja`);
        if (response.data) {
          setTipoCaja(response.data.ultimaCaja.tipoCaja === 'cierre' ? 'Cerrar' : 'Abrir');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Ocurrió un error al verificar el estado de la caja');
      }
    };

    const fetchData = async () => {
      try {
        const mesasResponse = await axios.get(`${backend}api/mesas`);
        setMesas(mesasResponse.data);

        const pisosResponse = await axios.get(`${backend}api/pisos/local/${localId}`);
        setPisos(pisosResponse.data);
      } catch (error) {
        console.error('Error al cargar datos:', error);
      }
    };

    obtenerEstadoCaja();
    fetchData();
  }, []);

  const handleMesaClick = (codigo) => {
    setSelectedMesa(selectedMesa === codigo ? null : codigo);
  };

  const columnCount = () => {
    if (mesas.length === 0) return 1;
    if (mesas.length < 4) return 2;
    if (mesas.length <= 6) return 3;
    if (mesas.length <= 10) return 4;
    return 4;
  };

  const mesasFiltradas = selectedPiso ? mesas.filter(mesa => mesa.piso._id === selectedPiso) : mesas;

  return (
    <div className="px-6 pt-4 bg-white text-gray-800 h-auto xl:h-full mb-8 lg:mb-24 w-full">
      <div className='flex items-center justify-between'>
        <h2 className="text-2xl font-bold text-center">Lista de Mesas</h2>
        <p>{tipoCaja}</p>
        <Reloj />
      </div>
      <div className="mb-4 flex space-x-4">
        {pisos.map(piso => (
          <button
            key={piso._id}
            onClick={() => setSelectedPiso(piso._id === selectedPiso ? null : piso._id)}
            className={`py-2 px-4 rounded-lg transition-all duration-300 
              ${selectedPiso === piso._id ? 'bg-green-500 text-white shadow-lg' : 'bg-gray-300 text-gray-800 hover:bg-green-400'}`}
          >
            {piso.nombre}
          </button>
        ))}
        <button
          onClick={() => setSelectedPiso(null)}
          className={`py-2 px-4 rounded-lg transition-all duration-300 
            ${selectedPiso === null ? 'bg-green-500 text-white shadow-lg' : 'bg-gray-300 text-gray-800 hover:bg-green-400'}`}
        >
          Todos
        </button>
      </div>
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${columnCount()} max-w-screen-xl mx-auto gap-8 my-8`}>
        {mesasFiltradas.map(mesa => (
          <Mesa
            key={mesa._id}
            mesa={mesa}
            selectedMesa={selectedMesa}
            onMesaClick={handleMesaClick}
          />
        ))}
      </div>
    </div>
  );
};

export default MesaList;
