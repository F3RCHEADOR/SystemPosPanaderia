import React, { useState, useEffect } from 'react';
import productosData from '../data/productos.json'; // Asegúrate de que la ruta sea correcta

const ProductList = () => {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    // Simular la carga de datos desde un archivo JSON
    setCategorias(productosData.categorias);
  }, []);

  return (
    <div className="p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Listado de Productos</h1>
      <div className="space-y-6 grid grid-cols-3 gap-8">
        {categorias.map((categoria) => (
          <div key={categoria.id} className="mb-4">
            <h2 className="text-2xl font-semibold mb-4 text-center">{categoria.nombre}</h2>
            <img
              src={categoria.imagen}
              alt={categoria.nombre}
              className="mx-auto object-cover rounded mb-4"
            />
            <ul className="space-y-2">
              {categoria.productos.map((producto) => (
                <li key={producto.id} className="p-4 bg-white shadow-md rounded flex items-center justify-between">
                  <span className="font-semibold">{producto.nombre}</span>
                  <span className="text-gray-500">${producto.precio.toFixed(2)}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
