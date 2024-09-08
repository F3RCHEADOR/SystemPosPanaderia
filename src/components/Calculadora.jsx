import React, { useState, useEffect, useRef } from 'react';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import ButtonCalculator from './ButtonCalculator';
import InvoiceDetail from './InvoiceDetail';

const CalculatorPanel = ({ clientData }) => {
  const [costTotal, setCostTotal] = useState('');
  const [receivedAmount, setReceivedAmount] = useState('');
  const [change, setChange] = useState('');
  const [activeInput, setActiveInput] = useState('costTotal');
  const [showConfirm, setShowConfirm] = useState(false);
  const [applyDiscount, setApplyDiscount] = useState(false);
  const [discountPercentage, setDiscountPercentage] = useState('');
  const toastBC = useRef(null);

  useEffect(() => {
    if (clientData && clientData.valorAcumulado !== undefined) {
      setCostTotal(clientData.valorAcumulado);
    }
  }, [clientData]);

  useEffect(() => {
    // Recalcular el costo total con descuento cuando cambie el porcentaje de descuento
    if (applyDiscount) {
      const discount = parseFloat(discountPercentage) || 0;
      const total = parseFloat(clientData.valorAcumulado) || 0;
      const discountedTotal = total - (total * (discount / 100));
      setCostTotal(discountedTotal);
    } else {
      // Restaurar el costo total original si el descuento no está aplicado
      setCostTotal(clientData.valorAcumulado);
    }
  }, [applyDiscount, discountPercentage, clientData]);

  useEffect(() => {
    // Recalcular el cambio cuando cambie el costo total o el monto recibido
    calculateChange();
  }, [costTotal, receivedAmount]);

  const handleButtonClick = (value) => {
    if (activeInput === 'costTotal') {
      setCostTotal((prev) => prev + value);
    } else if (activeInput === 'receivedAmount') {
      setReceivedAmount((prev) => prev + value);
    } else if (activeInput === 'discountPercentage') {
      setDiscountPercentage((prev) => prev + value);
    }
  };

  const calculateChange = () => {
    const total = parseFloat(costTotal) || 0;
    const received = parseFloat(receivedAmount) || 0;
    const result = received - total;
    setChange(result);
  };

  const clearInputs = () => {
    setCostTotal(clientData.valorAcumulado);
    setReceivedAmount('');
    setChange('');
    setApplyDiscount(false);
    setDiscountPercentage('');
  };

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
    setShowConfirm(true);
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
        const deleteResponse = await fetch(`https://apipos-production.up.railway.app/api/clientes/${clientData.codigo}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (!deleteResponse.ok) {
          throw new Error('Error al eliminar el cliente');
        }

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
      } else if (clientData.tipoCliente === "Mesa") {
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

        const saveResponse = await fetch('https://apipos-production.up.railway.app/api/mesas/pagos', {
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

      toastBC.current.show({
        severity: 'success',
        summary: 'Compra efectuada',
        detail: 'La compra se ha efectuado con éxito.',
        life: 10000
      });

      setShowConfirm(false);

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

  const cancelPurchase = () => {
    setShowConfirm(false);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === 'costTotal') {
      setCostTotal(value);
    } else if (id === 'receivedAmount') {
      setReceivedAmount(value);
    } else if (id === 'discountPercentage') {
      setDiscountPercentage(value);
    }
  };

  return (
    <div className="grid grid-cols-3 gap-4 mt-4">
      <div className="flex flex-col w-full h-full mb-8 overflow-auto items-center justify-center col-span-2 mx-auto border-4">
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
        <div className="w-full border-8 rounded-xl p-4">
          <div className="flex flex-col gap-4">
            {/* Costo Total */}
            <div className="text-center">
              <input
                id="costTotal"
                type="text"
                className="w-full text-xl font-bold p-4 border-4 bg-blue-100 border-blue-300 cursor-pointer"
                placeholder="Costo Total"
                value={costTotal}
                onClick={() => setActiveInput('costTotal')}
                onChange={handleInputChange}
              />
            </div>

            {/* Checkbox de Descuento */}
            <div className="flex items-center gap-4">
              <input
                type="checkbox"
                id="applyDiscount"
                checked={applyDiscount}
                onChange={(e) => setApplyDiscount(e.target.checked)}
              />
              <label htmlFor="applyDiscount" className="font-semibold text-lg">Aplicar Descuento</label>
            </div>

            {/* Porcentaje de Descuento */}
            {applyDiscount && (
              <div className="text-center">
                <label className="font-semibold text-lg">Porcentaje de Descuento</label>
                <input
                  id="discountPercentage"
                  type="number"
                  className="w-full text-xl font-bold p-4 border-4 bg-yellow-100 border-yellow-300"
                  placeholder="Descuento (%)"
                  value={discountPercentage}
                  onClick={() => setActiveInput('discountPercentage')}
                  onChange={handleInputChange}
                />
              </div>
            )}

            {/* Monto Recibido */}
            <div className="text-center">
              <input
                id="receivedAmount"
                type="text"
                className="w-full text-xl font-bold p-4 border-4 bg-green-100 border-green-300"
                placeholder="Recibe"
                value={receivedAmount}
                onClick={() => setActiveInput('receivedAmount')}
                onChange={handleInputChange}
              />
            </div>

            {/* Monto Cambio */}
            <div className="text-center">
              <input
                id="change"
                type="text"
                className="w-full text-xl font-bold p-4 border-4 bg-red-100 border-red-300"
                placeholder="Cambio"
                value={change}
                readOnly
              />
            </div>

            <div className="grid grid-cols-4 gap-2 mt-4 mx-auto">
              {[9, 8, 7, 6, 5, 4, 3, 2, 1, 0, '00', '.'].map((value) => (
                <ButtonCalculator key={value} value={value} onClick={() => handleButtonClick(value)} />
              ))}
            </div>
  
            {/* Botones de acciones */}
            <div className="grid grid-cols-2 gap-2 my-4">
             
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
  
      <InvoiceDetail clientData={clientData} recibe={receivedAmount} cambio={change} total={costTotal} />
    </div>
  );  

};

export default CalculatorPanel;
