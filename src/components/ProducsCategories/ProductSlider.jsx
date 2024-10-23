import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ProductSlider = () => {
  const backend = import.meta.env.VITE_BUSINESS_BACKEND;
  const localId = localStorage.getItem("localId");

  const [categorias, setCategorias] = useState([]);
  const [productos, setProductos] = useState([]);
  const [allProductos, setAllProductos] = useState([]); // Estado para todos los productos
  const [activeCategoriaId, setActiveCategoriaId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await fetch(`${backend}api/categorias/local/${localId}`);
        if (!response.ok) throw new Error('Error al cargar las categorías');
        const data = await response.json();
        setCategorias(data);
      } catch (error) {
        console.error("Error al obtener categorías:", error);
      }
    };

    const fetchAllProductos = async () => {
      try {
        const response = await fetch(`${backend}api/productos/local/${localId}`); // Cambia esto a tu URL real
        if (!response.ok) throw new Error('Error al cargar los productos');
        const data = await response.json();
        setAllProductos(data);
      } catch (error) {
        console.error("Error al obtener todos los productos:", error);
      }
    };

    fetchCategorias();
    fetchAllProductos();
  }, [backend, localId]);

  const fetchProductos = async (categoriaId) => {
    try {
      const response = await fetch(`${backend}api/productos/categoria/${categoriaId}`);
      console.log(response)
      if (!response.ok) throw new Error('Error al cargar los productos');
      const data = await response.json();
      setProductos(data);
    } catch (error) {
      console.error("Error al obtener productos:", error);
    }
  };

  const handleCategoriaClick = (id) => {
    setActiveCategoriaId(id);
    fetchProductos(id);
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 400,
    slidesToShow: 6,
    slidesToScroll: 6,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4
        }
      }
    ]
  };

  // Filtrar productos por el término de búsqueda
  const filteredProductos = allProductos.filter(producto =>
    producto.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="ml-56 h-full mb-8 xl:px-8">
      <h1 className="my-2.5 bg-gray-200 text-center text-3xl font-bold">Categorías</h1>

      <div className="mb-4 text-center">
        <input
          type="text"
          placeholder="Buscar producto..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 border-4 rounded-md w-1/3 focus:border-blue-500 text-center"
        />
      </div>

      <Slider {...sliderSettings}>
        {categorias
          .slice()
          .sort((a, b) => a.nombre.localeCompare(b.nombre))
          .map((categoria) => (
            <div key={categoria.id} className="p-4 border rounded-xl">
              <h2 className="text-2xl font-semibold mb-4 text-center">{categoria.nombre}</h2>
              <button className="w-full group-hover:scale-110 duration-150" onClick={() => handleCategoriaClick(categoria._id)}>
                <img
                  src={categoria.imagen}
                  alt={categoria.nombre}
                  className="mx-auto object-cover rounded mb-4"
                />
              </button>
            </div>
          ))}
      </Slider>

      {activeCategoriaId && (
        <div className="border-4 p-2 mt-4 rounded">
          <h2 className="text-xl font-semibold mb-4">Productos de la categoría seleccionada:</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
            {productos.map((producto) => (
              <div key={producto.id} className="p-4 border-2 rounded-xl">
                <h3 className="text-lg font-semibold mb-2 text-center">{producto.nombre}</h3>
                <div className="flex space-x-2 items-center justify-between my-2">
                  <span className="bg-green-300 text-center font-bold">${producto.precio}</span>
                  <div className="flex space-x-2">
                    <button className="px-1 py-1 bg-blue-500 text-white rounded">+</button>
                    <span className="font-semibold">1</span>
                    <button className="px-1 py-1 bg-red-500 text-white rounded">-</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Resultados de búsqueda */}
      {searchTerm && (
        <div className="border-4 p-2 mt-4 rounded">
          <h2 className="text-xl font-semibold mb-4">Resultados de la búsqueda:</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
            {filteredProductos.map((producto) => (
              <div key={producto.id} className="p-4 border-2 rounded-xl">
                <h3 className="text-lg font-semibold mb-2 text-center">{producto.nombre}</h3>
                <div className="flex space-x-2 items-center justify-between my-2">
                  <span className="bg-green-300 text-center font-bold">${producto.precio}</span>
                  <div className="flex space-x-2">
                    <button className="px-1 py-1 bg-blue-500 text-white rounded">+</button>
                    <span className="font-semibold">1</span>
                    <button className="px-1 py-1 bg-red-500 text-white rounded">-</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductSlider;
