import React from 'react';
import InfoClientPaid from '../layout/InfoClientPaid';


const Ventas = () => {


    return (
        <>
            <header className='grid grid-cols-3 gap-4 border-4 p-4 bg-slate-100 '>
                <div className='p-2 border-2 rounded-xl'>
                    <h2 className='text-center font-semibold text-lg'>Ventas Acumuladas</h2>
                    <p>- - - - -- - - - </p>
                </div>
                <div className='p-2 border-2 rounded-xl'>
                    <h2 className='text-center font-semibold text-lg'>Gastos Acumulados</h2>
                    <p>- - - - -- - - - </p>
                </div>
                <div className='p-2 border-2 rounded-xl'>
                    <h2 className='text-center font-semibold text-lg'>Venta Total</h2>
                    <p>- - - - -- - - - </p>
                </div>
                <div className='p-2 border-2 rounded-xl'>
                    <h2 className='text-center font-semibold text-lg'>Ultima Apertura Hora</h2>
                    <p>- - - - -- - - - </p>
                </div>
                <div className='p-2 border-2 rounded-xl'>
                    <h2 className='text-center font-semibold text-lg'>Total Clientes Hoy</h2>
                    <p>- - - - -- - - - </p>
                </div>
                <div className='p-2 border-2 rounded-xl'>
                    <h2 className='text-center font-semibold text-lg'>Total Pagos Hoy</h2>
                    <p>- - - - -- - - - </p>
                </div>
            </header>
            <InfoClientPaid />
        </>
    );
};

export default Ventas;
