import React, { useState } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ProductSlider = ({ categorias, activeCategoriaId, handleCategoriaClick, quantities, handleIncrement, handleDecrement }) => {
  const [searchTerm, setSearchTerm] = useState(""); // Estado para el término de búsqueda

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 400,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  // Filtrar productos que coincidan con el término de búsqueda
  const filteredProductos = categorias.flatMap(categoria =>
    categoria.productos.filter(producto =>
      producto.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="ml-56 h-full mb-8 xl:px-8">
      <h1 className="my-2.5 bg-gray-200 text-center text-3xl font-bold">Categorías</h1>

      {/* Input de búsqueda */}
      <div className="mb-4 text-center">
        <input
          type="text"
          placeholder="Buscar producto..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Actualiza el término de búsqueda
          className="px-4 py-2 border-4 rounded-md w-1/3 focus:border-blue-500 text-center"
        />
      </div>

      {/* Slider de categorías (sin cambios) */}
      <Slider {...sliderSettings}>
        {categorias
          .slice() // Crear una copia del array para no modificar el original
          .sort((a, b) => a.nombre.localeCompare(b.nombre)) // Ordenar alfabéticamente por nombre
          .map((categoria) => (
            <div key={categoria.id} className="p-4 border rounded-xl">
              <h2 className="text-2xl font-semibold mb-4 text-center">{categoria.nombre}</h2>
              <button className="w-full group-hover:scale-110 duration-150" onClick={() => handleCategoriaClick(categoria.id)}>
                <img
                  src={categoria.imagen}
                  alt={categoria.nombre}
                  className="mx-auto object-cover rounded mb-4"
                />
              </button>

              {activeCategoriaId === categoria.id && (
                <div className="border-4 px-1 bg-gray-100 rounded max-h-56 overflow-auto">
                  {categoria.productos
                    .slice() // Crear una copia del array de productos para no modificar el original
                    .sort((a, b) => a.nombre.localeCompare(b.nombre)) // Ordenar alfabéticamente por nombre
                    .map((producto) => (
                      <div key={producto.id} className="grid grid-cols-3 items-center group hover:bg-gray-200 gap-1 my-1 border-b-2 broder-t-2">
                        <span className="text-sm font-semibold">{producto.nombre}</span>
                        <span className="bg-green-300 text-center font-bold">${producto.precio}</span>
                        <div className="flex space-x-2 items-center justify-between group-hover:bg-gray-300">
                          <button onClick={() => handleIncrement(producto.id)} className="px-1 py-1 bg-blue-500 text-white rounded">+</button>
                          <span className="font-semibold">{quantities[producto.id]}</span>
                          <button onClick={() => handleDecrement(producto.id)} className="px-1 py-1 bg-red-500 text-white rounded">-</button>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          ))}
      </Slider>

      {/* Resultados de búsqueda debajo del input */}
      {searchTerm.length >= 2 && (
        <div className="my-8 p-2.5">
          <h2 className="text-xl font-semibold mb-4">Resultados de la búsqueda:</h2>
          {filteredProductos.length > 0 ? (
            <div className="grid grid-cols-4 xl:grid-cols-6 gap-4">
              {filteredProductos.map((producto) => (
                <div key={producto.id} className="p-4 border-2 rounded-xl">
                  <h3 className="text-lg font-semibold mb-2 text-center">{producto.nombre}</h3>
                  <div className="flex space-x-2 items-center justify-evenly my-2 group-hover:bg-gray-300">
                    <button onClick={() => handleIncrement(producto.id)} className="px-1 py-1 bg-blue-500 text-white rounded">+</button>
                    <span className="font-semibold">{quantities[producto.id]}</span>
                    <button onClick={() => handleDecrement(producto.id)} className="px-1 py-1 bg-red-500 text-white rounded">-</button>
                  </div>
                  <span className="block text-center font-bold bg-green-300">${producto.precio}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500">
              No se encontraron productos.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductSlider;
