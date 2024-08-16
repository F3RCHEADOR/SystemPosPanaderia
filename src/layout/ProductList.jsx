import React, { useState, useEffect } from 'react';
import productosData from '../data/productos.json'; // Asegúrate de que la ruta sea correcta

const ProductList = () => {
  const [categorias, setCategorias] = useState([]);
  const [activeCategoriaId, setActiveCategoriaId] = useState(null); // Para rastrear la categoría activa

  useEffect(() => {
    // Simular la carga de datos desde un archivo JSON
    setCategorias(productosData.categorias);
  }, []);

  const handleCategoriaClick = (id) => {
    setActiveCategoriaId(activeCategoriaId === id ? null : id); // Alternar entre mostrar y ocultar la categoría
  };

  return (
    <div className="p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Listado de Productos</h1>

      <div className="grid grid-cols-3 gap-8">
        {categorias.map((categoria) => (
          <div key={categoria.id} className="mb-4 group">
            <h2 className="text-2xl font-semibold mb-4 text-center group-hover:font-bold group-hover:bg-gray-200">{categoria.nombre}</h2>
            <button className='w-full group-hover:scale-110 duration-150' onClick={() => handleCategoriaClick(categoria.id)}>
              <img
                src={categoria.imagen}
                alt={categoria.nombre}
                className="mx-auto object-cover rounded mb-4"
              />
            </button>

            {activeCategoriaId === categoria.id && (
              <div className='border-8 border-gray-400 rounded-xl fixed top-1/2 z-30 h-80 overflow-auto left-1/2 bg-white p-8 transform -translate-y-1/2 -translate-x-1/2'><ul className=" space-y-2 w-96 bg-gray-400">
                <h2 className='font-bold underline m-4 text-center pt-4' > Lista de Productos de {categoria.nombre}</h2>
                {categoria.productos.map((producto) => (
                  <li key={producto.id} className=" p-4 bg-white shadow-md rounded flex items-center justify-between">
                    <span className="font-semibold">{producto.nombre}</span>
                    <span className="text-gray-500">${producto.precio.toFixed(2)}</span>
                  </li>
                ))}
              </ul>
                <button className='flex items-center justify-center p-2 mt-6 rounded-xl border-4 font-bold bg-green-400 mx-auto'><p className='space-x-2'>Agregar Mas<span className='px-2'>{categoria.nombre}</span></p></button>
              </div>

            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
