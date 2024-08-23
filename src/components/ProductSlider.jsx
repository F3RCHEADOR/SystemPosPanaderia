// src/components/ProductSlider.js
import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ProductSlider = ({ categorias, activeCategoriaId, handleCategoriaClick, quantities, handleIncrement, handleDecrement }) => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 400,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
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

  return (
    <div className="ml-56 h-full my-16 px-8">
      <h1 className="my-2.5 bg-gray-200 text-center text-3xl font-bold">Categorías</h1>
      <Slider {...sliderSettings}>
        {categorias.map((categoria) => (
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
                {categoria.productos.map((producto) => (
                  <div key={producto.id} className="grid grid-cols-3 items-center gap-1 my-1">
                    <span className="text-sm font-semibold">{producto.nombre}</span>
                    <span className="bg-green-300 text-center font-bold">${producto.precio.toFixed(2)}</span>
                    <div className="flex space-x-2 items-center justify-between">
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
    </div>
  );
};

export default ProductSlider;
