import React from 'react';
import Client from '../assets/client.png';
import ButtonCalculator from '../components/ButtonCalculator';


const PaidPage = () => {
  return (
    <>
      <aside className='fixed h-full w-56 bg-white border-r-4 flex flex-col items-center justify-start overflow-auto'>
        <h1 className='w-full text-center mt-4 font-bold bg-red-100'>
          Cliente Pagando
        </h1>
        <img src={Client} alt="client" className='mx-auto my-4' />
      </aside>
      <section className='ml-60 px-4'>
        <h1 className='text-2xl'></h1>
        <div className='max-w-2xl w-full mx-auto mt-4'>
          <input id='pantalla' type='text' className='w-full p-4 text-2xl' placeholder='Costo Total'></input>
          <div className='grid grid-cols-3 gap-8 mt-2 w-full mx-auto'>
            {Array.from({ length: 9 }, (_, i) => (
              <ButtonCalculator  value={i + 1} />
            ))}
            <ButtonCalculator value={0} />
            <ButtonCalculator value={'00'} />
            <ButtonCalculator value={'=>'} />
          </div>

        </div>
      </section>
    </>
  );
};

export default PaidPage;
