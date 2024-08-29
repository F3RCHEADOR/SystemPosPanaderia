import React from 'react';


const tipoNegocio = import.meta.env.VITE_BUSINESS_TYPE;
const nombreNegocio = import.meta.env.VITE_BUSINESS_NAME;
const logoNegocio = import.meta.env.VITE_BUSINESS_IMAGE;
const direccionNegocio = import.meta.env.VITE_BUSINESS_ADDRESS;

const InvoiceDetail = ({ clientData }) => {
  return (
    <div className={`border-2 rounded-md border-gray-500 bg-white p-4 min-h-96 overflow-scroll max-h-screen`}>
      <div className='flex flex-col items-center justify-center'>
        <img src={logoNegocio} className='w-auto h-16' alt="Logo de la empresa" />
        <p>{tipoNegocio}:<span className='px-2 italic font-semibold'>{nombreNegocio}</span></p>
      </div>
      <div className='flex items-center justify-evenly my-4'>
        <span>Tipo de Factura:</span>
        <span className='underline'>Recibo de Pago</span>
      </div>
      <div className='flex items-center justify-between'>
        <span>Fecha:</span>
        <span className=''>{clientData.horaOcupado ? clientData.horaOcupado : clientData.horaLlegada}</span>
      </div>
      <hr className='border-2 border-dashed mt-2 mb-4' />

      <ul className='list-disc'>
        <li className='grid grid-cols-5 gap-2 font-semibold mb-4'>
          <span className='col-span-3'>Producto</span>
          <span className='text-center'>Cantidad</span>
          <span className='text-center'>Precio</span>
        </li>
        {clientData && clientData.productos && clientData.productos.length > 0 ? (
          clientData.productos.map((producto, index) => (
            <li key={index} className='grid grid-cols-5 gap-2'>
              <span className='col-span-3'>{producto.nombre}</span>
              <span className='text-center'>{producto.cantidad}</span>
              <span className='text-center'>{producto.precio.toFixed(2)}</span>
            </li>
          ))
        ) : (
          <li>No hay productos seleccionados</li>
        )}
      </ul>
      <hr className='border-2 border-dashed mt-2 mb-8' />

      <ul>
        <li className='grid grid-cols-5 gap-2'>
          <span className='col-span-4 font-bold text-lg'>Total:</span>
          <span>{clientData.valorAcumulado.toFixed(2)}</span>
        </li>
        <li className='grid grid-cols-5 gap-2'>
          <span className='col-span-4'>Recibe:</span>
          <span>Cantidad</span>
        </li>
        <li className='grid grid-cols-5 gap-2'>
          <span className='col-span-4'>Cambio:</span>
          <span>Cantidad</span>
        </li>
      </ul>

      <hr className='border-2 border-dashed mt-2 mb-8' />

      <div className='grid grid-cols-3 gap-2 mb-2'>
        <span className='w-full font-semibold'>Dirección:</span>
        <span className='col-span-2'>{direccionNegocio}</span>
        <span className='w-full font-semibold'>Teléfono:</span>
        <span className='col-span-2'>Teléfono del Negocio</span>
      </div>
      <h3 className='text-center mt-4'>Piedecuesta</h3>

      <p className='text-center font-light text-md'>Gracias Por Tu Compra :3</p>
    </div>
  );
};

export default InvoiceDetail;
