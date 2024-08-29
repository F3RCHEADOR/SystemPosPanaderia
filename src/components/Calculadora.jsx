import React, { useState, useEffect } from 'react';
import ButtonCalculator from './ButtonCalculator'; // Asegúrate de que este componente existe

const CalculatorPanel = ({ clientData }) => {
  const [costTotal, setCostTotal] = useState('');
  const [receivedAmount, setReceivedAmount] = useState('');
  const [change, setChange] = useState('');
  const [activeInput, setActiveInput] = useState('costTotal'); // Define qué input está activo

  // Efecto para inicializar el costo total al cargar el componente
  useEffect(() => {
    if (clientData && clientData.valorAcumulado !== undefined) {
      setCostTotal(clientData.valorAcumulado);
    }
  }, [clientData]);

  // Función para manejar los clics en los botones de la calculadora
  const handleButtonClick = (value) => {
    if (activeInput === 'costTotal') {
      setCostTotal((prev) => prev + value);
    } else if (activeInput === 'receivedAmount') {
      setReceivedAmount((prev) => prev + value);
    }
  };

  // Función para calcular el cambio
  const calculateChange = () => {
    const total = parseFloat(costTotal) || 0;
    const received = parseFloat(receivedAmount) || 0;
    const result = received - total;
    setChange(result);
  };

  // Función para manejar la limpieza de entradas
  const clearInputs = () => {
    setCostTotal(clientData.valorAcumulado);
    setReceivedAmount('');
    setChange('');
  };

  // Función para manejar la confirmación de la compra
  const handlePurchase = () => {
    if (!receivedAmount) {
      alert('El campo "Recibe" está vacío.');
      return;
    }
    if (!change) {
      alert('El campo "Cambio" está vacío.');
      return;
    }
    const confirmed = window.confirm('¿Deseas efectuar la compra?');
    if (confirmed) {
      // Aquí puedes agregar la lógica para efectuar la compra
      alert('Compra efectuada con éxito.');
      clearInputs();
    }
  };


  return (
    <div className='flex flex-col h-screen items-center justify-center xl:col-span-2 mx-auto'>
      <div className='border-8 rounded-xl p-4'>
        <h1 className='text-center font-semibold text-lg m-1'>Costo Total</h1>
        <input
          id='costTotal'
          type='text'
          className='w-full p-4 border-4 bg-blue-100 border-blue-300 cursor-pointer'
          placeholder='Costo Total'
          value={costTotal}
          readOnly
          onClick={() => setActiveInput('costTotal')}
        />
        <h1 className='text-center font-semibold text-lg m-1'>Recibe</h1>
        <input
          id='receivedAmount'
          type='text'
          className='w-full p-4 border-4 bg-green-100 border-green-300 cursor-pointer'
          placeholder='Recibe'
          value={receivedAmount}
          readOnly
          onClick={() => setActiveInput('receivedAmount')}
        />
        <h1 className='text-center font-semibold text-lg m-1'>Cambio</h1>
        <input
          id='change'
          type='text'
          className='w-full p-4 border-4 bg-gray-100 border-gray-300'
          placeholder='Cambio'
          value={change}
          readOnly
        />
        <div className='grid grid-cols-4 gap-6 mt-2 mx-auto'>
          {/* Fila 1 */}
          <ButtonCalculator key={9} value={'9'} onClick={() => handleButtonClick('9')} />
          <ButtonCalculator key={8} value={'8'} onClick={() => handleButtonClick('8')} />
          <ButtonCalculator key={7} value={'7'} onClick={() => handleButtonClick('7')} />


          {/* Fila 2 */}
          <ButtonCalculator key={6} value={'6'} onClick={() => handleButtonClick('6')} />
          <ButtonCalculator key={5} value={'5'} onClick={() => handleButtonClick('5')} />
          <ButtonCalculator key={4} value={'4'} onClick={() => handleButtonClick('4')} />


          {/* Fila 3 */}
          <ButtonCalculator key={3} value={'3'} onClick={() => handleButtonClick('3')} />
          <ButtonCalculator key={2} value={'2'} onClick={() => handleButtonClick('2')} />
          <ButtonCalculator key={1} value={'1'} onClick={() => handleButtonClick('1')} />

          {/* Fila 4 */}
          <ButtonCalculator key={0} value={'0'} onClick={() => handleButtonClick('0')} />
          <ButtonCalculator key={10} value={'00'} onClick={() => handleButtonClick('00')} />
          <ButtonCalculator key={15} value={'.'} onClick={() => handleButtonClick('.')} />

        </div>


        <div className='grid grid-cols-3 gap-2 my-4 mx-auto'>
          <button
            className='bg-green-500 text-white rounded-lg text-center border-4 px-4 py-2 font-bold hover:scale-105 active:bg-green-600'
            onClick={handlePurchase}
          >
            Aceptar
          </button>
          <button
            className='bg-blue-500 text-white rounded-lg text-center border-4 px-4 py-2 font-bold hover:scale-105 active:bg-blue-600'
            onClick={calculateChange}
          >
            Calcular
          </button>
          <button
            className='bg-gray-400 text-white rounded-lg text-center border-4 px-4 py-2 font-bold hover:scale-105 active:bg-gray-500'
            onClick={clearInputs}
          >
            Limpiar
          </button>
        </div>

      </div>
    </div>
  );
};

export default CalculatorPanel;
