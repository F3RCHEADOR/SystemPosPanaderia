import Plus from '../assets/plus.svg';
import React, { useState, useEffect, useRef } from 'react';
import { Toast } from 'primereact/toast';
import "primereact/resources/themes/lara-light-cyan/theme.css";

const ProductList = () => {
  const toast = useRef(null);
  const [categorias, setCategorias] = useState([]);
  const [activeCategoriaId, setActiveCategoriaId] = useState(null);
  const [showNewCategory, setShowNewCategory] = useState(false);
  const [showNewProduct, setShowNewProduct] = useState(false);
  const [selectedCategoria, setSelectedCategoria] = useState(null);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryImage, setNewCategoryImage] = useState(null);
  const [newProductName, setNewProductName] = useState('');
  const [newProductPrice, setNewProductPrice] = useState('');

  // Cargar las categorías al montar el componente
  useEffect(() => {
    fetch('http://localhost:5000/api/categorias')
      .then(response => response.json())
      .then(data => {
        if (data && Array.isArray(data)) {
          setCategorias(data);
        } else {
          console.error('Datos recibidos no son un array:', data);
        }
      })
      .catch(error => console.error('Error al cargar categorías:', error));
  }, []);

  // Manejar el clic en una categoría
  const handleCategoriaClick = (id) => {
    setActiveCategoriaId(activeCategoriaId === id ? null : id);
    setShowNewCategory(false);
  };

  // Mostrar/ocultar el formulario de nueva categoría
  const handleNewCategory = () => {
    setShowNewCategory(!showNewCategory);
    setActiveCategoriaId(null);
  };

  // Mostrar/ocultar el formulario de nuevo producto
  const handleNewProduct = (categoria) => {
    setSelectedCategoria(categoria);
    setActiveCategoriaId(null);
    setShowNewProduct(true);
  };

  const handleCloseNewProduct = () => {
    setShowNewProduct(false);
    setSelectedCategoria(null);
  };

  // Crear nueva categoría
  const createCategory = async () => {
    const formData = new FormData();
    formData.append('nombre', newCategoryName);
    if (newCategoryImage) {
      formData.append('imagen', newCategoryImage);
    }

    try {
      const response = await fetch('http://localhost:5000/api/categorias', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const newCategory = await response.json();
        setCategorias([...categorias, newCategory]);
        setNewCategoryName('');
        setNewCategoryImage(null);
        setShowNewCategory(false);
        toast.current.show({ severity: "success", summary: 'Categoría Creada', detail: `Nombre: ${newCategory.nombre}`, life: 15000 });
      } else {
        toast.current.show({ severity: 'error', summary: 'Error', detail: 'No se pudo crear la categoría', life: 3000 });
        console.error('Error al crear categoría:', response.statusText);
      }
    } catch (error) {
      toast.current.show({ severity: 'error', summary: 'Error', detail: 'Error en la conexión', life: 3000 });
      console.error('Error en la conexión:', error);
    }
  };

  // Crear nuevo producto
  const createProduct = async () => {
    const product = {
      nombre: newProductName,
      precio: parseFloat(newProductPrice),
    };

    try {
      const response = await fetch(`http://localhost:5000/api/categorias/${selectedCategoria.id}/productos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(product),
      });

      if (response.ok) {
        const newProduct = await response.json();
        const updatedCategorias = categorias.map(categoria => {
          if (categoria.id === selectedCategoria.id) {
            return { ...categoria, productos: [...categoria.productos, newProduct] };
          }
          return categoria;
        });
        setCategorias(updatedCategorias);
        setNewProductName('');
        setNewProductPrice('');
        setShowNewProduct(false);
        setSelectedCategoria(null);
        toast.current.show({ severity: "success", summary: 'Producto Creado', detail: `Nombre: ${newProduct.nombre}`, life: 15000 });
      } else {
        toast.current.show({ severity: 'error', summary: 'Error', detail: 'No se pudo crear el producto', life: 3000 });
        console.error('Error al crear producto:', response.statusText);
      }
    } catch (error) {
      toast.current.show({ severity: 'error', summary: 'Error', detail: 'Error en la conexión', life: 3000 });
      console.error('Error en la conexión:', error);
    }
  };

  return (
    <>
      <Toast ref={toast} />
      <div className="p-6 bg-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold mb-6">Listado de Categorías/<span className="text-xl font-medium">Productos</span></h1>
          <button
            className="bg-green-200 p-2 border-4 border-green-400 rounded-xl font-bold text-gray-800 group hover:scale-105 duration-200 hover:bg-green-300 hover:border-green-500"
            onClick={handleNewCategory}
          >
            <img className="size-8 mx-auto" src={Plus} alt="plus" />
            <span className="text-center group-hover:text-white">Crear Categoria</span>
          </button>
        </div>
        <div className="relative grid grid-cols-3 gap-8">
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
                <div className='border-8 border-gray-400 rounded-xl fixed top-1/2 z-30 h-80 overflow-auto left-1/2 bg-white p-8 transform -translate-y-1/2 -translate-x-1/2'>
                  <ul className="space-y-2 w-96">
                    <button className="absolute top-2 right-2 flex items-center justify-center bg-red-500 px-2 py-1 font-extrabold text-white rounded-full border-4 border-gray-800" onClick={() => handleCategoriaClick(categoria.id)}>X</button>
                    <h2 className='font-bold underline m-4 text-center pt-4'> Lista de Productos de {categoria.nombre}</h2>
                    {categoria.productos.map((producto) => (
                      <li key={producto.id} className="p-4 bg-white shadow-md rounded flex items-center justify-between">
                        <span className="font-semibold">{producto.nombre}</span>
                        <span className="text-gray-500">${producto.precio.toFixed(2)}</span>
                      </li>
                    ))}
                  </ul>
                  <button onClick={() => handleNewProduct(categoria)} className='flex items-center justify-center p-2 mt-6 rounded-xl border-4 font-bold bg-green-400 mx-auto'>
                    <p className='space-x-2'>Agregar Más<span className='px-2'>{categoria.nombre}</span></p>
                  </button>
                </div>
              )}
            </div>
          ))}

          {/* Formulario para Nuevo Producto */}
          {showNewProduct && selectedCategoria && (
            <div className={`absolute top-1/2 right-1/2 transform translate-x-1/2 -translate-y-1/2 w-[500px] h-auto bg-white border-8 rounded-xl`}>
              <h2 className="bg-green-200 text-center p-2 m-2 text-xl font-bold underline rounded-xl">Nuevo Producto en {selectedCategoria.nombre}</h2>
              <button className="absolute top-4 right-4 w-8 h-8 bg-red-300 font-bold rounded-full text-center hover:scale-105 hover:text-white" onClick={handleCloseNewProduct}>X</button>
              <div className="flex flex-col items-center p-6">
                <label className="block mb-2">Nombre del Producto</label>
                <input
                  type="text"
                  value={newProductName}
                  onChange={(e) => setNewProductName(e.target.value)}
                  className="border p-2 rounded mb-4 w-full"
                />
                <label className="block mb-2">Precio</label>
                <input
                  type="number"
                  value={newProductPrice}
                  onChange={(e) => setNewProductPrice(e.target.value)}
                  className="border p-2 rounded mb-4 w-full"
                />
                <button
                  onClick={createProduct}
                  className="bg-green-200 p-2 border-4 border-green-400 rounded-xl font-bold text-gray-800 hover:scale-105 duration-200 hover:bg-green-300 hover:border-green-500"
                >
                  Crear Producto
                </button>
              </div>
            </div>
          )}

          {/* Formulario para Nueva Categoría */}
          {showNewCategory && (
            <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] bg-white border-8 rounded-xl p-6'>
              <h2 className="bg-green-200 text-center p-2 m-2 text-xl font-bold underline rounded-xl">Nueva Categoría</h2>
              <button className="absolute top-4 right-4 w-8 h-8 bg-red-300 font-bold rounded-full text-center hover:scale-105 hover:text-white" onClick={() => setShowNewCategory(false)}>X</button>
              <div className="flex flex-col items-center">
                <label className="block mb-2">Nombre de la Categoría</label>
                <input
                  type="text"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  className="border p-2 rounded mb-4 w-full"
                />
                <label className="block mb-2">Imagen de la Categoría</label>
                <input
                  type="file"
                  onChange={(e) => setNewCategoryImage(e.target.files[0])}
                  className="border p-2 rounded mb-4 w-full"
                />
                <button
                  onClick={createCategory}
                  className="bg-green-200 p-2 border-4 border-green-400 rounded-xl font-bold text-gray-800 hover:scale-105 duration-200 hover:bg-green-300 hover:border-green-500"
                >
                  Crear Categoría
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductList;
