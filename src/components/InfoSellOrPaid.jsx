import React from "react";

function InfoSellOrPaid({ info, onClose }) {
  return (
    <>
      <div className="fixed top-1/2 right-1/2 transform translate-x-1/2 -translate-y-1/2 w-96 h-auto z-50 bg-white border-8 rounded-lg p-4">
        <button onClick={onClose} className="absolute top-2 right-2 font-semibold rounded-full p-2 bg-red-400 border text-white">
          X
        </button>
        <h1 className={` ${info.empresa !== '' ? 'bg-red-200' : 'bg-green-200'} font-bold`}>
          Informacion {info.empresa !== '' ? 'del pago a ' + info.empresa : 'del Cliente'}
        </h1>

        <div className="flex items-center justify-evenly px-8 my-1">
          <span className="font-bold">Fecha: </span><span>{info.fecha}</span><span className="pl-4 font-bold">Hora: </span><span>{info.hora}</span>
        </div>

        <ul className="border-2 p-2 rounded-xl">
          <li className="grid grid-cols-4 gap-4 font-bold">
            <span className="col-span-2 text-center">Producto</span><span>Cantidad</span><span>Precio</span>
          </li>
          {Object.keys(info.productos).map((producto, index) => (
            <li className="grid grid-cols-4 gap-4 items-center" key={index}>
              <span className="col-span-2">{info.productos[producto].nombre}</span>
              <span>{info.productos[producto].cantidad}</span>
              <span className="bg-green-200">{info.productos[producto].precio ? info.productos[producto].precio : info.productos[producto].costo}</span>
            </li>
          ))}
        </ul>

        <h1 className="mt-4 text-center font-semibold">Venta: {info.valorPago}</h1>
        <button className="px-2.5 py-2 m-2 bg-green-300 font-bold border-4">Imprimir</button>
      </div>
    </>
  );
}

export default InfoSellOrPaid;
