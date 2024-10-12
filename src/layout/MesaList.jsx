import React, { useState, useEffect } from 'react';
import { useDrop } from 'react-dnd';
import MesaImagen from '../assets/mesa.png';
import InfoMesa from '../components/infoMesa';
import Reloj from '../components/Reloj';


const ItemTypes = {
  CLIENT: 'client',
};

const backend = import.meta.env.VITE_BUSINESS_BACKEND;



const Mesa = ({ mesa, onClienteDrop, selectedMesa, onMesaClick }) => {
 
  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: ItemTypes.CLIENT,
    canDrop: () => mesa.estado !== 'Ocupado', // Solo permite dropear si la mesa no está ocupada
    drop: (item) => {
      if (mesa.estado !== 'Ocupado') {
        onClienteDrop(item.codigo, mesa.codigo);
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }), [onClienteDrop, mesa]);

  // Definir el color de fondo basado en el estado de la mesa
  const mesaBackgroundColor = mesa.estado === 'Ocupado' ? 'bg-red-500' : 'bg-green-500';
  const overlayColor = isOver && canDrop ? 'scale:105' : '';

  return (
    <div
      ref={drop}
      className={`relative border-2 rounded-xl p-4 h-auto ${mesaBackgroundColor} ${overlayColor}`}
    >
      <button
        className="flex items-center justify-center w-full"
        onClick={() => onMesaClick(mesa.codigo)}
      >
        <img src={MesaImagen} alt={`Mesa ${mesa.codigo}`} className="w-auto xl:w-28 mx-auto transition-all" />
      </button>

      {selectedMesa === mesa.codigo && (
        <InfoMesa
          mesa={mesa}
          onClose={() => onMesaClick(null)}
        />
      )}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 font-bold text-gray-900">{mesa.codigo}</div>
      {mesa.cliente && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-sm text-white">
          <span className="font-bold">Cliente :</span> {mesa.cliente.nombre}
        </div>
      )}
    </div>
  );
};


const MesaList = ({ onClienteDrop }) => {
  const [mesas, setMesas] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [selectedMesa, setSelectedMesa] = useState(null);
  const [tipoCaja, setTipoCaja] = useState(null); // Inicializa el estado de tipoCaja

  useEffect(() => {
    const obtenerEstadoCaja = async () => {
      try {
        const response = await fetch(`${backend}api/caja`); // Espera la respuesta
        if (!response.ok) throw new Error('Error al obtener el estado de la caja');

        const data = await response.json();
        console.log(data);

        // Obtén el último registro
        const ultimoRegistro = data[data.length - 1];
        console.log(ultimoRegistro);

        // Determina el tipo de caja para la siguiente operación
        if (ultimoRegistro) {
          setTipoCaja(ultimoRegistro.tipoCaja === 'apertura' ? 'Abierta' : 'Cerrada');
        } 
      } catch (error) {
        console.error('Error:', error);
        alert('Ocurrió un error al verificar el estado de la caja');
      }
    };

    obtenerEstadoCaja(); // Ejecuta la función para obtener el estado de la caja
  }, []); // Se ejecuta solo una vez cuando el componente se monta

  useEffect(() => {
    const fetchData = async () => {
      try {
        const mesasResponse = await fetch(backend + 'api/mesas');
        const mesasData = await mesasResponse.json();
        setMesas(mesasData);

        const clientesResponse = await fetch(backend + 'api/clientes');
        const clientesData = await clientesResponse.json();
        setClientes(clientesData);
      } catch (error) {
        console.error('Error al cargar datos:', error);
      }
    };

    fetchData();
  }, []);

  const handleMesaClick = (codigo) => {
    setSelectedMesa(selectedMesa === codigo ? null : codigo);
  };

  const handleClienteDrop = async (clienteCodigo, mesaCodigo) => {
    try {
      // Obtener los datos del cliente
      const clienteResponse = await fetch(backend + `api/clientes/${clienteCodigo}`);
      if (!clienteResponse.ok) throw new Error('Error al obtener datos del cliente');
      const clienteData = await clienteResponse.json();

      // Actualizar la mesa con los datos del cliente
      const mesaUpdateResponse = await fetch(backend + `api/mesas/${mesaCodigo}/actualizar`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productos: clienteData.productos,
          valorAcumulado: clienteData.valorAcumulado,
          estado: 'Ocupado',
          horaOcupado: new Date().toISOString(),
        }),
      });
      if (!mesaUpdateResponse.ok) throw new Error('Error al actualizar la mesa');
      const updatedMesa = await mesaUpdateResponse.json();

      // Actualizar la lista de mesas en el estado
      setMesas(prevMesas => prevMesas.map(mesa => (mesa.codigo === mesaCodigo ? updatedMesa : mesa)));

      // Eliminar el cliente
      const deleteResponse = await fetch(backend + `api/clientes/${clienteCodigo}`, {
        method: 'DELETE',
      });
      if (!deleteResponse.ok) throw new Error('Error al eliminar el cliente');

      // Actualizar la lista de clientes en el estado
      setClientes(prevClientes => prevClientes.filter(cliente => cliente.codigo !== clienteCodigo));
      window.location.href = '/';

    } catch (error) {
      console.error('Error al manejar cliente:', error);
    }
  };


  return (
    <div className="px-6 pt-4 bg-gray-100 h-auto xl:h-full w-full">
      <div className='flex items-center justify-between'>
        <h2 className="text-2xl font-bold text-center">Lista de Mesas</h2>
        {/* Mostrar tipoCaja dinámicamente */}
        <p className={`${tipoCaja === 'Abierta' ? 'bg-blue-300' : 'bg-red-300'} hidden xl:block rounded-lg p-2 font-bold italic text-xl`}>
          {tipoCaja ? `Caja ${tipoCaja}` : 'Cargando estado de la caja...'}
        </p>
        <Reloj />
        <div className='hidden xl:block'>
          <span className='p-2.5 rounded-full w-4 h-4 bg-red-400 mx-2 font-bold'>Ocupado</span>
          <span className='p-2.5 rounded-full w-4 h-4 bg-green-400 mx-2 font-bold'>Libre</span>
        </div>
      </div>
      <div className="grid grid-cols-2 xl:grid-cols-3 max-w-screen-xl mx-auto gap-8 my-8">
        {mesas.map((mesa) => (
          <Mesa
            key={mesa.codigo}
            mesa={mesa}
            onClienteDrop={handleClienteDrop}
            selectedMesa={selectedMesa}
            onMesaClick={handleMesaClick}
          />
        ))}
      </div>
    </div>
  );
  
};

export default MesaList;
