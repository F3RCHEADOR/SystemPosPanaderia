
import Client from "../assets/client.png";
import React, { useState, useEffect, useRef } from 'react';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { Toast } from 'primereact/toast';
import productosData from '../data/productos.json';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Button } from 'primereact/button';

const ListProducts = () => {
  const [categorias, setCategorias] = useState([]);
  const [activeCategoriaId, setActiveCategoriaId] = useState(null);
  const [quantities, setQuantities] = useState({});
  const toast = useRef(null);

  useEffect(() => {
    setCategorias(productosData.categorias);
    const initialQuantities = {};
    productosData.categorias.forEach(categoria => {
      categoria.productos.forEach(producto => {
        initialQuantities[producto.id] = 0;
      });
    });
    setQuantities(initialQuantities);
  }, []);

  const handleCategoriaClick = (id) => {
    setActiveCategoriaId(activeCategoriaId === id ? null : id);
  };

  const handleIncrement = (productId) => {
    setQuantities(prevQuantities => ({
      ...prevQuantities,
      [productId]: prevQuantities[productId] + 1,
    }));
  };

  const handleDecrement = (productId) => {
    setQuantities(prevQuantities => ({
      ...prevQuantities,
      [productId]: Math.max(prevQuantities[productId] - 1, 0),
    }));
  };

  const calculateTotal = () => {
    return categorias.reduce((acc, categoria) => {
      const totalCategoria = categoria.productos.reduce((total, producto) => {
        return total + producto.precio * quantities[producto.id];
      }, 0);
      return acc + totalCategoria;
    }, 0);
  };

  const createClient = async () => {
    const cliente = {
      codigo: `C${String(Date.now()).slice(-4)}`, // Ejemplo de código autoincremental basado en timestamp
      horaLlegada: new Date().toLocaleTimeString(),
      productos: categorias.flatMap(categoria =>
        categoria.productos
          .filter(producto => quantities[producto.id] > 0)
          .map(producto => ({
            nombre: producto.nombre,
            precio: producto.precio
          })
        )
      ),
      valorAcumulado: calculateTotal()
    };

    try {
      const response = await fetch('http://localhost:5000/api/clientes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(cliente)
      });

      if (response.ok) {
        const newClient = await response.json();
        toast.current.show({ severity: "success", summary: 'Cliente Creado', detail: `Código: ${newClient.codigo}`, life: 15000 });
        console.log('Cliente creado:', newClient);
      } else {
        toast.current.show({ severity: 'error', summary: 'Error', detail: 'No se pudo crear el cliente', life: 3000 });
        console.error('Error al crear cliente:', response.statusText);
      }
    } catch (error) {
      toast.current.show({ severity: 'error', summary: 'Error', detail: 'Error en la conexión', life: 3000 });
      console.error('Error en la conexión:', error);
    }
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
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
    <>
      <Toast ref={toast} />
      <aside className='fixed h-full w-56 bg-white border-r-4 flex flex-col items-center justify-start overflow-auto'>
        <h1 className='w-full text-center mt-4 font-bold bg-red-100'>Cliente Nuevo</h1>
        <img src={Client} alt="client" className='mx-auto my-4' />
        <h2 className="text-lg font-bold mb-4">Selección:</h2>
        <ul className="w-full px-4">
          {categorias.flatMap(categoria => categoria.productos.filter(producto => quantities[producto.id] > 0).map(producto => (
            <li key={producto.id} className="flex justify-between items-center mb-2">
              <span className="font-semibold text-base" >{producto.nombre}</span>
              <span className="text-nowrap bg-green-300 p-1 font-bold" >{quantities[producto.id]} x ${producto.precio.toFixed(2)}</span>
            </li>
          )))}
        </ul>
        <div className="w-full px-4 mb-2">
          <hr className="my-2" />
          <div className="flex justify-between items-center font-bold text-xl">
            <span>Total:</span>
            <span >${calculateTotal().toFixed(2)}</span>
          </div>
        </div>
        <div className="w-full px-4 mt-auto mb-16">
          <Button label="Crear Cliente" icon="pi pi-check" onClick={createClient} className="p-button-rounded p-button-success" />
        </div>
      </aside>
      <div className="ml-56">
        <h1 className="my-2.5 bg-gray-100 text-center text-xl font-bold">Categorías</h1>
        <Slider {...sliderSettings}>
          {categorias.map((categoria) => (
            <div key={categoria.id} className="p-4">
              <h2 className="text-2xl font-semibold mb-4 text-center">{categoria.nombre}</h2>
              <button className="w-full group-hover:scale-110 duration-150" onClick={() => handleCategoriaClick(categoria.id)}>
                <img
                  src={categoria.imagen}
                  alt={categoria.nombre}
                  className="mx-auto object-cover rounded mb-4"
                />
              </button>

              {activeCategoriaId === categoria.id && (
                <div className="border-4 px-1 bg-gray-100 rounded">
                  {categoria.productos.map((producto) => (
                    <div key={producto.id} className="grid grid-cols-3 items-center gap-1 my-1 ">
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
    </>
  );
};

export default ListProducts;
