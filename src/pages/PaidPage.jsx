import React, { useState, useEffect } from 'react';
import Client from '../assets/client.png';
import ButtonCalculator from '../components/ButtonCalculator';
import { useLocation } from 'react-router-dom';

const PaidPage = () => {
  const location = useLocation();
  const { clientData } = location.state || {};

  const [inputValue, setInputValue] = useState('');

  const [factura, setFactura] = useState('z-10');

  const handleFactura = () => {
    setFactura(prevIndez => prevIndez === 'z-10' ? 'z-30' : 'z-10');
  }
  console.log(clientData)
  useEffect(() => {
    // Establece el valor acumulado en el input al montar el componente
    if (clientData) {
      setInputValue(clientData.valorAcumulado.toFixed(2));
    }
  }, [clientData]);

  const handleButtonClick = (value) => {
    // Si el valor es "Borrar", resetea el input
    if (value === 'Borrar') {
      setInputValue('');
    } else {
      // Actualiza el estado del input con el valor del botón
      setInputValue((prev) => prev + value);
    }
  };

  return (
    <>
      <aside className='fixed h-full w-56 -mt-4 bg-white border-r-4 flex flex-col items-center justify-start overflow-auto'>
        <h1 className='w-full text-center mt-4 font-bold bg-red-100'>
          Cliente Pagando
        </h1>
        <img src={Client} alt="client" className='mx-auto my-4' />
        <h2 className="text-lg font-bold mb-4">Selección:</h2>
        <ul className="w-full px-4">
          {clientData && clientData.productos && clientData.productos.length > 0 ? (
            clientData.productos.map((producto, index) => (
              <li key={index} className="flex justify-between items-center mb-2">
                <span className="font-semibold text-base">{producto.nombre}</span>
                <span className="text-nowrap bg-green-300 p-1 font-bold">
                  {producto.cantidad} x ${producto.precio.toFixed(2)}
                </span>
              </li>
            ))
          ) : (
            <li>No hay productos seleccionados</li>
          )}
        </ul>
        <div className="w-full px-4 mb-2">
          <hr className="my-2" />
          <div className="flex justify-between items-center font-bold text-xl">
            <span>Total:</span>
            <span>{clientData?.valorAcumulado?.toFixed(2)}</span>
          </div>
        </div>
      </aside>
      <section className='ml-60 px-4'>
        <h1 className='text-2xl'></h1>
        <div className='w-full flex flex-col mt-4'>
          <div onClick={handleFactura} className={`absolute top-8 ${factura} right-1/2 transform translate-x-3/4 w-96 xl:w-[450px] h-80 overflow-y-auto border-2 rounded-md border-gray-500 bg-white p-4`}>
            <div className='flex flex-col items-center justify-center space-y-4 mt-2'>
              <span>Logo</span>
              <span>Recibo</span>
            </div>
            <div className='flex items-center justify-between'>
              <span>
                Fecha:
              </span>
              <span className=''>{clientData.horaOcupado}</span>
            </div>
            <hr className='border-2 border-dashed mt-2 mb-8' />

            <ul className='list-disc'>
              {clientData && clientData.productos && clientData.productos.length > 0 ? (
                clientData.productos.map((producto, index) => (
                  <li key={index} className='grid grid-cols-5 gap-2'><span className='col-span-3'>{producto.nombre}</span><span>{producto.cantidad}</span><span>{producto.precio}</span></li>))) : (
                <li>No hay productos seleccionados</li>
              )}
            </ul>
            <hr className='border-2 border-dashed mt-2 mb-8' />

            <ul>
              <li className='grid grid-cols-5 gap-2'>
                <span className='col-span-4 font-bold text-lg'>Total</span><span>{clientData.valorAcumulado.toFixed(2)}</span>
              </li>
              <li className='grid grid-cols-5 gap-2'>
                <span className='col-span-4 '>Cash</span><span>Cantidad</span>
              </li>
              <li className='grid grid-cols-5 gap-2'>
                <span className='col-span-4 '>Cambio</span><span>Cantidad</span>
              </li>
            </ul>

            <hr className='border-2 border-dashed mt-2 mb-8' />

            <p className='text-center font-light text-md'>Gracias Por Tu Compra :3</p>

          </div>
          <div className='relative w-4/5 lg:w-4/6 xl:w-3/6 z-20 flex items-center justify-center -translate-x-6 xl:translate-x-0 mx-auto border-4 py-4 mt-56 bg-gray-600 rounded-xl p-4'>
            <div>
              <div className='grid grid-cols-4 gap-4 mb-8'>
                <input
                  id='pantalla'
                  type='text'
                  className='col-span-3 p-4 border-4 border-blue-300'
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
