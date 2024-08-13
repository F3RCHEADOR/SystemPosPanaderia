// src/components/InfoMesa.jsx
import React from 'react';
import MesaImagen from '../assets/mesa.png';
import ButtonPayment from './ButtonPayment';

const InfoMesa = ({ mesa, onClose }) => {
    if (!mesa) return null;

    return (
        <div className="fixed top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-12 z-50 h-auto h-max-80 overflow-auto w-96 p-4 bg-white shadow-md rounded">
            <button onClick={onClose} className="absolute top-2 right-2 font-extrabold hover:scale-125 text-white p-2 m-1 rounded-full bg-red-300 ">X</button>
            <h3 className="text-xl font-semibold text-center bg-orange-300">Mesa {mesa.codigo}</h3>
            <img src={MesaImagen} alt="" className='w-28 mx-auto my-2' />
            <p className='pl-4'><strong>Hora Ocupado:</strong> {new Date(mesa.horaOcupado).toLocaleString()}</p>
            <p className='pl-4'><strong>Valor Acumulado:</strong> ${mesa.valorAcumulado.toFixed(2)}</p>
            <h4 className="mt-2 font-bold pl-4">Productos:</h4>
            <ul className="list-disc list-inside ml-4 pl-2">
                {mesa.productos.map((producto, index) => (
                    <li key={index}>{producto.nombre} - ${producto.precio.toFixed(2)}</li>
                ))}
            </ul>
            <ButtonPayment />
        </div>
    );
};

export default InfoMesa;
