import React, { useState, useEffect, useRef } from 'react';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { Toast } from 'primereact/toast';
import productosData from '../data/productos.json';
import NuevoClienteAside from "../components/NuevoClienteAside";
import ProductSlider from "../components/ProductSlider";

const ListProducts = ({ clientData, isEdit }) => {
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

  useEffect(() => {
    if (isEdit && clientData) {
      const updatedQuantities = {};
      clientData.productos.forEach(producto => {
        const productId = productosData.categorias.flatMap(categoria =>
          categoria.productos
        ).find(p => p.nombre === producto.nombre)?.id;

        if (productId) {
          updatedQuantities[productId] = producto.cantidad;
        }
      });
      setQuantities(updatedQuantities);
    }
  }, [clientData, isEdit]);

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

  const createOrUpdateClient = async () => {
    const cliente = {
      ...clientData,
      horaLlegada: isEdit ? clientData.horaLlegada : new Date().toLocaleTimeString(),
      productos: categorias.flatMap(categoria =>
        categoria.productos
          .filter(producto => quantities[producto.id] > 0)
          .map(producto => ({
            nombre: producto.nombre,
            precio: producto.precio,
            cantidad: quantities[producto.id]
          }))
      ),
    };

    try {
      const response = await fetch(`http://localhost:5000/api/clientes${isEdit ? `/${cliente.codigo}` : ''}`, {
        method: isEdit ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(cliente)
      });

      if (response.ok) {
        const newClient = await response.json();
        toast.current.show({ severity: "success", summary: isEdit ? 'Cliente Actualizado' : 'Cliente Creado', detail: `Código: ${newClient.codigo}`, life: 15000 });
        console.log('Cliente', isEdit ? 'actualizado' : 'creado', ':', newClient);
      } else {
        toast.current.show({ severity: 'error', summary: 'Error', detail: 'No se pudo guardar el cliente', life: 3000 });
        console.error('Error al guardar cliente:', response.statusText);
      }
    } catch (error) {
      toast.current.show({ severity: 'error', summary: 'Error', detail: 'Error en la conexión', life: 3000 });
      console.error('Error en la conexión:', error);
    }
  };

  return (
    <>
      <Toast ref={toast} />
      <NuevoClienteAside    
        categorias={categorias}
        quantities={quantities}
        createOrUpdateClient={createOrUpdateClient}
        isEdit={isEdit}
      />
      <ProductSlider
        categorias={categorias}
        activeCategoriaId={activeCategoriaId}
        handleCategoriaClick={handleCategoriaClick}
        quantities={quantities}
        handleIncrement={handleIncrement}
        handleDecrement={handleDecrement}
      />
    </>
  );
};

export default ListProducts;
