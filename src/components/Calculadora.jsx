import React, { useState, useEffect, useRef } from 'react';
/* Asegúrate de importar los estilos de PrimeReact */
import 'primereact/resources/themes/saga-blue/theme.css'; /* O el tema que prefieras */
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import ButtonCalculator from './ButtonCalculator'; // Asegúrate de que este componente existe
import InvoiceDetail from './InvoiceDetail';

const CalculatorPanel = ({ clientData }) => {
  const [costTotal, setCostTotal] = useState('');
  const [receivedAmount, setReceivedAmount] = useState('');
  const [change, setChange] = useState('');
  const [activeInput, setActiveInput] = useState('costTotal');
  const [showConfirm, setShowConfirm] = useState(false); // Estado para controlar el diálogo
  const toastBC = useRef(null); // Referencia al Toast

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
    setCostTotal(''); // Reinicia el costo total con el valor inicial
    setReceivedAmount('');
    setChange('');
  };

  // Función para manejar la confirmación de la compra
  const handlePurchase = () => {
    if (!costTotal) {
      toastBC.current.show({
        severity: 'error',
        summary: 'Error',
        detail: 'El campo "Costo Total" está vacío.',
        life: 3000
      });
      return;
    }
    if (!receivedAmount) {
      toastBC.current.show({
        severity: 'error',
        summary: 'Error',
        detail: 'El campo "Recibe" está vacío.',
        life: 3000
      });
      return;
    }
   
    if (receivedAmount < costTotal) {
      toastBC.current.show({
        severity: 'error',
        summary: 'Error',
        detail: 'El campo "Recibe" No Puede ser menor que el "Costo Total".',
        life: 3000
      });
      return;
    }
    setShowConfirm(true); // Muestra el diálogo de confirmación
  };

  const confirmPurchase = async () => {
    if (!costTotal) {
      toastBC.current.show({
        severity: 'error',
        summary: 'Error',
        detail: 'El campo "Costo Total" está vacío.',
        life: 3000
      });
      return;
    }
    if (!receivedAmount) {
      toastBC.current.show({
        severity: 'error',
        summary: 'Error',
        detail: 'El campo "Recibe" está vacío.',
        life: 3000
      });
      return;
    }
    
    if (receivedAmount < costTotal) {
      toastBC.current.show({
        severity: 'error',
        summary: 'Error',
        detail: 'El campo "Recibe" No Puede ser menor que el "Costo Total".',
        life: 3000
      });
      return;
    }

    try {
      if (clientData.tipoCliente === "Individual") {
        // Elimina al cliente de la API
        const deleteResponse = await fetch(`https://apipos-production.up.railway.app/api/clientes/${clientData.codigo}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (!deleteResponse.ok) {
          throw new Error('Error al eliminar el cliente');
        }
        // Guarda los datos del cliente en "pagos" para tipo "Individual"
        if (clientData.tipoCliente === "Individual") {
          const saveResponse = await fetch('https://apipos-production.up.railway.app/api/clientes/pagos', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(clientData)
          });

          if (!saveResponse.ok) {
            throw new Error('Error al guardar los datos en pagos');
          }
        }
      } else if (clientData.tipoCliente === "Mesa") {
        // Si el cliente es una mesa, desocupa la mesa y guarda en pagos
        const desocuparResponse = await fetch(`https://apipos-production.up.railway.app/api/mesas/${clientData.codigo}/desocupar`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(clientData)
        });

        if (!desocuparResponse.ok) {
          throw new Error('Error al desocupar la mesa');
        }

        // Guarda los datos del cliente en "pagos" para tipo "Mesa"
        const saveResponse = await fetch('https://apipos-production.up.railway.app/api/mesas/pagos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(clientData)
        });
        console.log(clientData);

        if (!saveResponse.ok) {
          throw new Error('Error al guardar los datos en pagos');
        }
      }

      toastBC.current.show({
        severity: 'success',
        summary: 'Compra efectuada',
        detail: 'La compra se ha efectuado con éxito.',
        life: 10000
      });

      setShowConfirm(false); // Oculta el diálogo

    } catch (error) {
      toastBC.current.show({
        severity: 'error',
        summary: 'Error',
        detail: `Ocurrió un error: ${error.message}`,
        life: 10000
      });
      console.error('Error en la operación:', error);
    }
  };




  // Función para cancelar la compra
  const cancelPurchase = () => {
    setShowConfirm(false); // Oculta el diálogo
  };


  return (
    <div className='grid grid-cols-2 xl:grid-cols-3 gap-4'>
      <div className='flex flex-col h-screen items-center justify-center xl:col-span-2 mx-auto border-4'>
        <Toast ref={toastBC} />
        <Dialog
          header="Confirmación de Compra"
          visible={showConfirm}
          style={{ width: '50vw' }}
          footer={
            <div className='font-bold'>
              <Button className='bg-blue-200 border-2 rounded-xl border-gray-500 mx-4 my-2 p-2' label="Sí" icon="pi pi-check" onClick={confirmPurchase} />
              <Button label="No" icon="pi pi-times" onClick={cancelPurchase} className="p-button-secondary bg-red-200 border-2 rounded-xl border-gray-500 p-2 my-2" />
            </div>
          }
          onHide={() => setShowConfirm(false)}
        >
          <p>¿Deseas efectuar la compra?</p>
        </Dialog>
        <div className='border-8 rounded-xl p-4'>
          <h1 className='text-center font-semibold text-lg m-1'>Costo Total</h1>
          <input
            id='costTotal'
            type='text'
            className='w-full text-xl font-bold p-4 border-4 bg-blue-100 border-blue-300 cursor-pointer'
            placeholder='Costo Total'
            value={costTotal}
            readOnly
            onClick={() => setActiveInput('costTotal')}
          />
          <h1 className='text-center font-semibold text-lg m-1'>Recibe</h1>

          <input
            id='receivedAmount'
            type='text'
            className='w-full text-xl font-bold p-4 border-4 bg-green-100 border-green-300 cursor-pointer'
            placeholder='Recibe'
            value={receivedAmount}
            readOnly
            onClick={() => setActiveInput('receivedAmount')}
          />
          <h1 className='text-center font-semibold text-lg m-1'>Cambio</h1>
          <input
            id='change'
            type='text'
            className='w-full text-xl font-bold p-4 border-4 bg-gray-100 border-gray-300'
            placeholder='Cambio'
            value={change}
            readOnly
          />
          <div className='grid grid-cols-4 gap-2 mt-4 mx-auto'>
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


          <div className='grid grid-cols-3 gap-2 my-4'>
            <button
              className='bg-blue-500 text-white rounded-xl border-4 px-4 py-2 font-bold hover:scale-105 active:bg-blue-600'
              onClick={calculateChange}
            >
              Calcular
            </button>


            <button
              className='bg-red-400 text-white rounded-xl border-4 px-4 py-2 font-bold hover:scale-105 active:bg-red-500'
              onClick={clearInputs}
            >
              Limpiar
            </button>

            <button
              className='bg-green-500 text-white rounded-xl border-4 px-4 py-2 font-bold hover:scale-105 active:bg-green-600'
              onClick={handlePurchase}
            >
              Aceptar
            </button>

          </div>

        </div>
      </div>
      <InvoiceDetail clientData={clientData} recibe={receivedAmount} cambio={change} />
    </div>

  );
};

export default CalculatorPanel;
