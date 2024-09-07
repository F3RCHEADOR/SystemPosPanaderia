import React, { useState, useEffect, useRef } from 'react';
import convertirNumero from '../numberToWords.js';
import BagMoney from '../assets/money-bag.png';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import "primereact/resources/themes/lara-light-cyan/theme.css";

function ContadorBilletes() {
  const toast = useRef(null);

  const [billetes, setBilletes] = useState({
    100000: 0,
    50000: 0,
    20000: 0,
    10000: 0,
    5000: 0,
    2000: 0,
    1000: 0,
    500: 0,
    200: 0,
    100: 0,
    50: 0
  });

  const [tipoCaja, setTipoCaja] = useState(null);
  const [idCaja, setIdCaja] = useState(null);

  const verificarEstadoCaja = async () => {
    try {
      const response = await fetch('https://apipos-production.up.railway.app/api/caja');
      if (!response.ok) throw new Error('Error al obtener el estado de la caja');

      const data = await response.json();

      // Obtiene el último registro
      const ultimoRegistro = data[data.length - 1];

      // Determina el tipo de caja para la siguiente operación
      if (ultimoRegistro) {
        setTipoCaja(ultimoRegistro.tipoCaja === 'apertura' ? 'cierre' : 'apertura');
        setIdCaja(ultimoRegistro.id + 1);
      } else {
        setTipoCaja('apertura'); // Si no hay registros, comienza con 'apertura'
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Ocurrió un error al verificar el estado de la caja');
    }
  };

  useEffect(() => {
    verificarEstadoCaja();
  }, []);

  const handleChange = (denominacion, valor) => {
    setBilletes((prevBilletes) => ({
      ...prevBilletes,
      [denominacion]: parseInt(valor, 10) || 0
    }));
  };

  const mensaje = tipoCaja === 'apertura'
    ? 'Apertura de Caja'
    : tipoCaja === 'cierre'
      ? 'Cierre de Caja'
      : 'Estado de Caja';

  const confirmarCaja = async () => {
    if (confirm('Estas Seguro De Realizar Esta Accion?')) {
      try {
        if (!tipoCaja) {
          alert('No se pudo determinar el tipo de caja');
          return;
        }

        const response = await fetch(`'https://apipos-production.up.railway.app/api/caja/registrar`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            tipoCaja, // 'apertura' o 'cierre'
            fecha: formatearFecha().split(' ')[0],
            hora: formatearFecha().split(' ')[1],
            tipoMoneda: billetes,
            totalCaja: total
          }),
        });

        if (!response.ok) {
          throw new Error('Error al registrar la caja');
        }

        const resultado = await response.json();
        toast.current.show({ severity: "success", summary: mensaje + 'Realizado Correctamente', life: 15000 });
        console.log('Resultado:', resultado); // Opcional, para depuración

        // Limpia los campos después de registrar la caja
        limpiarCampos();
        verificarEstadoCaja();
      } catch (error) {
        console.error('Error:', error);
        alert('Ocurrió un error al registrar la caja');
      }
    }
  };


  const limpiarCampos = () => {
    // Restablece los valores de los billetes a 0
    Object.keys(billetes).forEach((denominacion) => {
      handleChange(denominacion, 0);
    });

  };

  const total = Object.keys(billetes).reduce(
    (acc, denom) => acc + billetes[denom] * denom,
    0
  );

  const totalEnLetras = convertirNumero(total);

  const formatearFecha = () => {
    const fecha = new Date();
    const dia = String(fecha.getDate()).padStart(2, '0');
    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
    const anio = fecha.getFullYear();
    const horas = String(fecha.getHours()).padStart(2, '0');
    const minutos = String(fecha.getMinutes()).padStart(2, '0');
    const segundos = String(fecha.getSeconds()).padStart(2, '0');
    return `${dia}/${mes}/${anio} ${horas}:${minutos}:${segundos}`;
  };

  return (
    <>
      <Toast ref={toast} />
      <div className="max-w-screen h-screen mx-auto p-8 bg-white border border-gray-300 rounded-lg shadow-lg">
        <div className='grid grid-cols-3 gap-4'>
          <div className='col-span-2 px-4'>
            <div className="grid grid-cols-2 gap-4 border-4 p-4 rounded-xl">
              <h2 className='text-center col-span-2 text-2xl font-extrabold'>Contenido de la Caja</h2>
              {Object.keys(billetes)
                .sort((a, b) => b - a) // Ordena las denominaciones de mayor a menor
                .map((denominacion) => (
                  <div
                    key={denominacion}
                    className="flex items-center justify-between p-4 bg-gray-100 rounded-lg shadow-sm hover:bg-gray-200 active:bg-gray-300 transition duration-150 border border-gray-300"
                  >
                    <label className="text-lg font-medium text-gray-700">
                      ${denominacion}
                    </label>
                    <input
                      type="number"
                      value={billetes[denominacion]}
                      onChange={(e) => handleChange(denominacion, e.target.value)}
                      className="w-20 p-2 border border-gray-300 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
                      min="0"
                    />
                  </div>
                ))}
            </div>
          </div>
          <div className="flex flex-col items-center mt-8">
            <div>
              <h1 className='text-center bg-green-200 font-bold text-2xl p-1 mx-4 mb-6'>
                {tipoCaja === 'apertura' ? 'Apertura de la Caja' : tipoCaja === 'cierre' ? 'Cierre de la Caja' : 'Estado de la Caja'}
              </h1>
              <h3 className='text-2xl font-semibold text-gray-800'>Caja Numero: #{idCaja}</h3>
              <p className="text-2xl font-semibold text-gray-800">Total: ${total}</p>
              <p className="text-lg font-medium text-gray-600 mt-2">
                ({totalEnLetras})
              </p>
              <p className='text-lg font-medium text-gray-600 mt-2 '> Fecha y Hora de {tipoCaja === 'apertura' ? 'Apertura' : tipoCaja === 'cierre' ? 'Cierre' : ''}: {formatearFecha()}</p>
              <div className="mt-6 text-center">
                <Button
                  className="bg-blue-600 text-xl font-bold text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-700 active:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 hover:scale-105 transition duration-150"
                  onClick={confirmarCaja}
                  label={'Confirmar ' + mensaje}
                />

                <img src={BagMoney} alt="imagen" className='size-32 mx-auto mt-12 hover:scale-110 duration-200' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>

  );
}

export default ContadorBilletes;
