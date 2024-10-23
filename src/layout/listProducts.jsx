import React, { useState, useEffect } from 'react';
import NuevoClienteAside from "../components/NuevoClienteAside";
import ProductSlider from "../components/ProducsCategories/ProductSlider";

const backend = import.meta.env.VITE_BUSINESS_BACKEND; // Asegúrate de que esta línea esté aquí
  const localId = localStorage.getItem("localId");

const ListProducts = ({ clientData, isEdit }) => {
  const [categorias, setCategorias] = useState([]);
  const [activeCategoriaId, setActiveCategoriaId] = useState(null);
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
 
    fetch(backend+'api/categorias/'+localId)
      .then(response => response.json())
      .then(data => {
        if (data && Array.isArray(data)) {
          setCategorias(data);

          // Inicializar quantities después de que categorías se haya establecido
          const initialQuantities = {};
          data.forEach(categoria => {
            categoria.productos.forEach(producto => {
              initialQuantities[producto.id] = 0;
            });
          });
          setQuantities(initialQuantities);
        } else {
          console.error('Datos recibidos no son un array:', data);
        }
      })
      .catch(error => console.error('Error al cargar categorías:', error));
  }, []);

  useEffect(() => {
    if (isEdit && clientData) {
      const updatedQuantities = {};
      clientData.productos.forEach(producto => {
        const productId = categorias.flatMap(categoria =>
          categoria.productos
        ).find(p => p.nombre === producto.nombre)?.id;

        if (productId) {
          updatedQuantities[productId] = producto.cantidad;
        }
      });
      setQuantities(updatedQuantities);
    }
  }, [clientData, isEdit, categorias]);

  const handleCategoriaClick = (id) => {
    setActiveCategoriaId(activeCategoriaId === id ? null : id);
  };

  const handleIncrement = (productId) => {
    setQuantities(prevQuantities => ({
      ...prevQuantities,
      [productId]: (prevQuantities[productId] || 0) + 1,
    }));
  };

  const handleDecrement = (productId) => {
    setQuantities(prevQuantities => ({
      ...prevQuantities,
      [productId]: Math.max((prevQuantities[productId] || 0) - 1, 0),
    }));
  };

  return (
    <> 
    
      <NuevoClienteAside    
        categorias={categorias}
        quantities={quantities}
        isEdit={isEdit}
        clientData={clientData}
      />
      <ProductSlider
       
      />
    </>
  );
};

export default ListProducts;
