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
  const [applyDiscount, setApplyDiscount] = useState(false); // Estado para aplicar descuento
  const [discountPercentage, setDiscountPercentage] = useState(''); // Estado para porcentaje de descuento
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
    setApplyDiscount(false); // Resetea el estado del descuento
    setDiscountPercentage(''); // Resetea el porcentaje de descuento
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
    <div className="grid grid-cols-3 gap-4">
      <div className="flex flex-col w-full h-screen items-center justify-center col-span-2 mx-auto border-4">
        <Toast ref={toastBC} />
        <Dialog
          header="Confirmación de Compra"
          visible={showConfirm}
          style={{ width: '50vw' }}
          footer={
            <div className="font-bold">
              <Button
                className="bg-blue-200 border-2 rounded-xl border-gray-500 mx-4 my-2 p-2"
                label="Sí"
                icon="pi pi-check"
                onClick={confirmPurchase}
              />
              <Button
                label="No"
                icon="pi pi-times"
                className="p-button-secondary bg-red-200 border-2 rounded-xl border-gray-500 p-2 my-2"
                onClick={cancelPurchase}
              />
            </div>
          }
          onHide={() => setShowConfirm(false)}
        >
          <p>¿Deseas efectuar la compra?</p>
        </Dialog>

        {/* Sección de detalles del costo */}
        <div className="w-3/4 border-8 rounded-xl p-4">
          <div className="flex flex-col gap-4">
            {/* Costo Total */}
            <div className="text-center">
              <label className="font-semibold text-lg">Costo Total</label>
              <input
                id="costTotal"
                type="text"
                className="w-full text-xl font-bold p-4 border-4 bg-blue-100 border-blue-300 cursor-pointer"
                placeholder="Costo Total"
                value={costTotal}
                readOnly
                onClick={() => setActiveInput('costTotal')}
              />
            </div>

            {/* Recibe */}
            <div className="text-center">
              <label className="font-semibold text-lg">Recibe</label>
              <input
                id="receivedAmount"
                type="text"
                className="w-full text-xl font-bold p-4 border-4 bg-green-100 border-green-300 cursor-pointer"
                placeholder="Recibe"
                value={receivedAmount}
                readOnly
                onClick={() => setActiveInput('receivedAmount')}
              />
            </div>

            {/* Cambio */}
            <div className="text-center">
              <label className="font-semibold text-lg">Cambio</label>
              <input
                id="change"
                type="text"
                className="w-full text-xl font-bold p-4 border-4 bg-gray-100 border-gray-300"
                placeholder="Cambio"
                value={change}
                readOnly
              />
            </div>
  
            {/* Checkbox de Descuento */}
            <div className="flex items-center gap-4">
              <input
                type="checkbox"
                id="applyDiscount"
                checked={applyDiscount}
                onChange={(e) => setApplyDiscount(e.target.checked)}
                className="w-6 h-6"
              />
              <label className="text-lg font-semibold" htmlFor="applyDiscount">
                Aplicar Descuento
              </label>
            </div>
  
            {/* Input de porcentaje de descuento si está activado */}
            {applyDiscount && (
              <div className="text-center">
                <label className="font-semibold text-lg">Porcentaje de Descuento</label>
                <input
                  type="number"
                  className="w-full text-xl font-bold p-4 border-4 bg-yellow-100 border-yellow-300"
                  placeholder="Descuento (%)"
                  value={discountPercentage}
                  onChange={(e) => setDiscountPercentage(e.target.value)}
                />
              </div>
            )}
  
            {/* Teclado numérico */}
            <div className="grid grid-cols-4 gap-2 mt-4 mx-auto">
              {[9, 8, 7, 6, 5, 4, 3, 2, 1, 0, '00', '.'].map((value, index) => (
                <ButtonCalculator key={index} value={value} onClick={() => handleButtonClick(value)} />
              ))}
            </div>
  
            {/* Botones de acciones */}
            <div className="grid grid-cols-3 gap-2 my-4">
              <button
                className="bg-blue-500 text-white rounded-xl border-4 px-4 py-2 font-bold hover:scale-105 active:bg-blue-600"
                onClick={calculateChange}
              >
                Calcular
              </button>
              <button
                className="bg-red-400 text-white rounded-xl border-4 px-4 py-2 font-bold hover:scale-105 active:bg-red-500"
                onClick={clearInputs}
              >
                Limpiar
              </button>
              <button
                className="bg-green-500 text-white rounded-xl border-4 px-4 py-2 font-bold hover:scale-105 active:bg-green-600"
                onClick={handlePurchase}
              >
                Aceptar
              </button>
            </div>
          </div>
        </div>
      </div>
  
      <InvoiceDetail clientData={clientData} recibe={receivedAmount} cambio={change} />
    </div>
  );  

};

export default CalculatorPanel;
