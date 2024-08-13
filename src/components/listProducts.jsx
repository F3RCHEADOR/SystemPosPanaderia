import React, { useState, useEffect } from 'react';
import productosData from '../data/productos.json'; // Asegúrate de que la ruta sea correcta

const listProducts = () => {
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
    <>
      <h1 className="my-2.5 bg-gray-100">Tittle Categories</h1>
      <article>


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
              <div className=''>
                {categoria.productos.map((producto) => (
                  <div className='flex items-center justify-between'>
                    <span>Name</span>
                    <span>Cost</span>
                    <div className='flex space-x-2 items-center justify-between'>
                      <buton>+</buton>
                      <span>0</span>
                      <button>-</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </article>
    </>
  )

}


export default listProducts;