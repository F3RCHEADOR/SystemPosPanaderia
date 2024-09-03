import React from 'react';
import Cliente from '../assets/client.png';
import Bill from '../assets/bill.png';


const InfoClientPaid = () => {


    return (
        <>
            <article className='w-full grid grid-cols-5 gap-6 xl:pl-16 px-4 '>
                <figure className='w-40 h-52 bg-white my-4 border-4 rounded-xl '>
                    <span className='flex items-center justify-center'>Hora</span>
                    <img src={Cliente} alt="cliente" className='mx-auto mt-4' />
                    <span className='flex items-center justify-center'>Recibido</span>
                </figure>
                <figure className='w-40 h-52 bg-white my-4 border-4 rounded-xl '>
                    <span className='flex items-center justify-center'>Hora</span>
                    <img src={Cliente} alt="cliente" className='mx-auto mt-4' />
                    <span className='flex items-center justify-center'>Recibido</span>
                </figure>
                <figure className='w-40 h-52 bg-white my-4 border-4 rounded-xl '>
                    <span className='flex items-center justify-center'>Hora</span>
                    <img src={Bill} alt="cliente" className='mx-auto mt-4' />
                    <span className='flex items-center justify-center'>Pagado</span>
                </figure>
                <figure className='w-40 h-52 bg-white my-4 border-4 rounded-xl '>
                    <span className='flex items-center justify-center'>Hora</span>
                    <img src={Cliente} alt="cliente" className='mx-auto mt-4' />
                    <span className='flex items-center justify-center'>Recibido</span>
                </figure>
                <figure className='w-40 h-52 bg-white my-4 border-4 rounded-xl '>
                    <span className='flex items-center justify-center'>Hora</span>
                    <img src={Bill} alt="cliente" className='mx-auto mt-4' />
                    <span className='flex items-center justify-center'>Pagado</span>
                </figure>

            </article>
        </>
    );
};

export default InfoClientPaid;
