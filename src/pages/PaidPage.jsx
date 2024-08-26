import React, { useState } from 'react';
import Client from '../assets/client.png';
import ButtonCalculator from '../components/ButtonCalculator';

const PaidPage = () => {
  const [inputValue, setInputValue] = useState('');

  const handleButtonClick = (value) => {
    // Actualiza el estado del input con el valor del botón
    setInputValue(prev => prev + value);
  };

  return (
    <>
      <aside className='fixed h-full w-56 xl:w-96 -mt-4 bg-white border-r-4 flex flex-col items-center justify-start overflow-auto'>
        <h1 className='w-full text-center mt-4 font-bold bg-red-100'>
          Cliente Pagando
        </h1>
        <img src={Client} alt="client" className='mx-auto my-4' />
      </aside>
      <section className='ml-60 px-4'>
        <h1 className='text-2xl'></h1>
        <div className='w-full flex flex-col mt-4'>
          <div className='absolute top-8 right-1/2 transform translate-x-3/4 w-96 xl:w-[450px] h-80 overflow-y-auto bg-white'>
          </div>
          <div className='relative w-4/5 lg:w-4/6 xl:w-3/6 z-20 flex items-center justify-center -translate-x-6 xl:translate-x-0 mx-auto border-4 py-4 mt-56 bg-gray-600 rounded-xl p-4'>
            <div>
              <div className='grid grid-cols-4 gap-4 mb-8'>
                <input
                  id='pantalla'
                  type='text'
                  className='col-span-3 p-4'
                  placeholder='Costo Total'
                  value={inputValue}
                  readOnly // Esto hace que el input sea solo lectura
                />
                <ButtonCalculator key={9} value={'Borrar'} onClick={() => handleButtonClick('Borrar')} />
              </div>
              <div className='grid grid-cols-4 gap-8 mt-2 mx-auto'>
                {/* Fila 1 */}
                <ButtonCalculator key={9} value={'9'} onClick={() => handleButtonClick('9')} />
                <ButtonCalculator key={8} value={'8'} onClick={() => handleButtonClick('8')} />
                <ButtonCalculator key={7} value={'7'} onClick={() => handleButtonClick('7')} />
                <ButtonCalculator key={12} value={'*'} onClick={() => handleButtonClick('*')} />

                {/* Fila 2 */}
                <ButtonCalculator key={6} value={'6'} onClick={() => handleButtonClick('6')} />
                <ButtonCalculator key={5} value={'5'} onClick={() => handleButtonClick('5')} />
                <ButtonCalculator key={4} value={'4'} onClick={() => handleButtonClick('4')} />
                <ButtonCalculator key={13} value={'-'} onClick={() => handleButtonClick('-')} />

                {/* Fila 3 */}
                <ButtonCalculator key={3} value={'3'} onClick={() => handleButtonClick('3')} />
                <ButtonCalculator key={2} value={'2'} onClick={() => handleButtonClick('2')} />
                <ButtonCalculator key={1} value={'1'} onClick={() => handleButtonClick('1')} />
                <ButtonCalculator key={14} value={'+'} onClick={() => handleButtonClick('+')} />

                {/* Fila 4 */}
                <ButtonCalculator key={0} value={'0'} onClick={() => handleButtonClick('0')} />
                <ButtonCalculator key={10} value={'00'} onClick={() => handleButtonClick('00')} />
                <ButtonCalculator key={15} value={'/'} onClick={() => handleButtonClick('/')} />
                <ButtonCalculator key={11} value={'=>'} onClick={() => handleButtonClick('=>')} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PaidPage;
