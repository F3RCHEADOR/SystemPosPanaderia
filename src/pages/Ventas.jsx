import React from 'react';
import InfoClientPaid from '../layout/InfoSellPaid.jsx';
import AsideVentas from '../components/AsideVentas.jsx';


const Ventas = () => {


    return (
        <>  <div className='absolute z-50'>
               <AsideVentas />
        </div>
         
            <InfoClientPaid />
        </>
    );
};

export default Ventas;
