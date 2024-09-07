import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

const tipoNegocio = import.meta.env.VITE_BUSINESS_TYPE;
const nombreNegocio = import.meta.env.VITE_BUSINESS_NAME;
const logoNegocio = import.meta.env.VITE_BUSINESS_IMAGE;
const direccionNegocio = import.meta.env.VITE_BUSINESS_ADDRESS;

const InvoiceDetail = ({ clientData, recibe, cambio, total }) => {
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    pageStyle: `
      @page {
        size: 58mm auto; /* Cambia a 80mm si tu impresora es de 80mm */
        margin: 0;
      }
      @media print {
        body {
          margin: 0;
          padding: 0;
        }
      }
    `,
  });

  return (
    <div>
      <div ref={componentRef} className='w-48 p-2 text-xs'>
        <div className='flex flex-col items-center justify-center'>
          <img src={logoNegocio} className='w-auto h-12' alt="Logo de la empresa" />
          <p>{tipoNegocio}:<span className='px-2 italic font-semibold'>{nombreNegocio}</span></p>
        </div>
        <div className='flex items-center justify-evenly my-2'>
          <span>Tipo de Factura:</span>
          <span className='underline'>Recibo de Pago</span>
        </div>
        <div className='flex items-center justify-between'>
          <span>Fecha:</span>
          <span className=''>{clientData.horaOcupado ? clientData.horaOcupado : clientData.horaLlegada}</span>
        </div>
        <hr className='border-dashed my-2' />

        <ul className='list-disc'>
          <li className='grid grid-cols-5 gap-2 font-semibold mb-2'>
            <span className='col-span-3'>Producto</span>
            <span className='text-center'>Cant</span>
            <span className='text-center'>Precio</span>
          </li>
          {clientData && clientData.productos && clientData.productos.length > 0 ? (
            clientData.productos.map((producto, index) => (
              <li key={index} className='grid grid-cols-5 gap-2'>
                <span className='col-span-3'>{producto.nombre}</span>
                <span className='text-center'>{producto.cantidad}</span>
                <span className='text-center'>{producto.precio}</span>
              </li>
            ))
          ) : (
            <li>No hay productos seleccionados</li>
          )}
        </ul>
        <hr className='border-dashed my-2' />

        <ul>
          <li className='grid grid-cols-5 gap-2'>
            <span className='col-span-3 font-bold'>Total:</span>
            <span className='col-span-2 text-center font-bold'>{total}</span>
          </li>
          <li className='grid grid-cols-5 gap-2'>
            <span className='col-span-3'>Recibe:</span>
            <span className='col-span-2 text-center font-bold'>{recibe ? recibe : 'Por determinar'}</span>
          </li>
          <li className='grid grid-cols-5 gap-2'>
            <span className='col-span-3'>Cambio:</span>
            <span className='col-span-2 text-center font-bold'>{cambio ? cambio : 'Por determinar'}</span>
          </li>
        </ul>

        <hr className='border-dashed my-2' />

        <div className='grid grid-cols-3 gap-2 mb-2'>
          <span className='w-full font-semibold'>Dirección:</span>
          <span className='col-span-2'>{direccionNegocio}</span>
          <span className='w-full font-semibold'>Teléfono:</span>
          <span className='col-span-2'>Teléfono del Negocio</span>
        </div>
        <h3 className='text-center mt-4'>Piedecuesta</h3>

        <p className='text-center font-light'>Gracias Por Tu Compra :3</p>
      </div>

      <button onClick={handlePrint} className='mt-4 p-2 bg-blue-500 text-white rounded'>
        Imprimir Factura
      </button>
    </div>
  );
};

export default InvoiceDetail;
