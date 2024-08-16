import React, { useState } from 'react';

function FormInventories() {
    const [fields, setFields] = useState([{ id: 0, nombreProducto: '', cantidad: '', costo: '' }]);
    const [nextId, setNextId] = useState(1);

    const addField = () => {
        setFields([...fields, { id: nextId, nombreProducto: '', cantidad: '', costo: '' }]);
        setNextId(nextId + 1); // Incrementar el ID para el próximo campo
    };  

    const removeField = (id) => {
        setFields(fields.filter(field => field.id !== id));
    };

    const handleChange = (id, e) => {
        const { name, value } = e.target;
        setFields(fields.map(field => field.id === id ? { ...field, [name]: value } : field));
    };

    return (
        <section className="m-2">
            <div className="flex flex-row space-x-2 items-center justify-center">
                <label htmlFor="empresa" className="text-lg font-medium text-gray-700 mb-2">
                    Nombre Empresa
                </label>
                <input
                    id="empresa"
                    type="text"
                    placeholder="Nombre de la Empresa"
                    className="p-3 border border-gray-500 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div className="space-y-4">
                <div className="flex items-center">
                    <input
                        id="add-tax"
                        type="checkbox"
                        className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label
                        htmlFor="add-tax"
                        className="ml-3 text-lg font-medium text-gray-700"
                    >
                        Agregar IVA
                    </label>
                </div>
            </div>
            <div className="grid grid-cols-5 gap-8 my-4 ">
                <span className="col-span-2 text-lg font-medium text-gray-700">Nombre Producto</span>
                <span className="text-lg font-medium text-gray-700">Cantidad</span>
                <span className="text-lg font-medium text-gray-700">Costo</span>
            </div>
            <div id="campos" className="space-y-4 my-4">
                {fields.map(field => (
                    <div key={field.id} className="grid grid-cols-5 gap-4">
                        <input
                            name="nombreProducto"
                            value={field.nombreProducto}
                            onChange={(e) => handleChange(field.id, e)}
                            className="col-span-2 p-3 border border-gray-500 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            type="text"
                            placeholder="Nombre Producto"
                        />
                        <input
                            name="cantidad"
                            value={field.cantidad}
                            onChange={(e) => handleChange(field.id, e)}
                            className="text-center p-3 border border-gray-500 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            type="number"
                            placeholder="Cantidad"
                        />
                        <input
                            name="costo"
                            value={field.costo}
                            onChange={(e) => handleChange(field.id, e)}
                            className="p-3 border border-gray-500 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            type="text"
                            placeholder="Costo"
                        />
                        {fields.length > 1 && (
                            <button
                                onClick={() => removeField(field.id)}
                                className="px-4 py-2.5 rounded-full border-4 border-gray-800 hover:text-white hover:scale-110 duration-150 bg-red-400"
                            >
                                Eliminar
                            </button>
                        )}
                    </div>
                ))}
            </div>
            <div className="flex items-center justify-evenly text-2xl font-extrabold m-4 my-2">
                <button
                    onClick={addField}
                    className="px-4 py-2.5 rounded-full border-4 border-gray-800 hover:text-white hover:scale-110 duration-150 bg-blue-400"
                >
                    +
                </button>
            </div>
            <button className="px-6 py-4 rounded-full bg-green-400 border-4 border-gray-800 font-semibold hover:text-white duration-200 hover:bg-green-600 hover:scale-110 m-2 ">Registrar </button>
        </section>
    );
}

export default FormInventories;
