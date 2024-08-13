import React, { useState } from 'react';
import MesaList from '../layout/MesaList';
import ClientList from '../layout/ClientList';
import clientesData from '../data/cliente.json';
import Caja from '../components/Caja';

const Home = () => {
  const [clientes, setClientes] = useState(clientesData);

  const handleClienteDrop = (codigo) => {
    // Elimina el cliente de la lista cuando se coloca en una mesa
    setClientes(prevClientes => prevClientes.filter(cliente => cliente.codigo !== codigo));
  };
  
  return (
    <div className='w-full'>
 
        <div className=''><ClientList  onDropCliente={handleClienteDrop} /></div>

        <div className='ml-56 '>
          <Caja />
          <MesaList clientes={clientes} onClienteDrop={handleClienteDrop} />
        </div>
      
    </div>
  );
};

export default Home;
