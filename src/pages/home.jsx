import React from 'react';
import MesaList from '../layout/MesaList';
import ClientList from '../layout/ClientList';
import Caja from '../components/Caja';

const Home = () => {
  return (
    <div className='w-full'>
 
        <div className=''><ClientList /></div>

        <div className='ml-56 '>
          <Caja />
          <MesaList />
        </div>
      
    </div>
  );
};

export default Home;
