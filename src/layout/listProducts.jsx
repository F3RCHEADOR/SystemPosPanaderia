import React, { useState, useEffect } from 'react';
import NuevoClienteAside from "../components/Cliente/NuevoClienteAside";
import ProductSlider from "../components/ProducsCategories/ProductSlider";

const backend = import.meta.env.VITE_BUSINESS_BACKEND; // Asegúrate de que esta línea esté aquí
const localId = localStorage.getItem("localId");

const ListProducts = ({ clientData, isEdit }) => {
  const [cart, setCart] = useState({});


  // Función para actualizar el carrito
  const handleUpdateCart = (newCantidades) => {
    setCart(newCantidades);
    console.log('Carrito actualizado:', newCantidades); // Para verificar la actualización
  };


  return (
    <>

      <NuevoClienteAside isEdit={isEdit} clientData={clientData} productos={cart} />
      <ProductSlider onUpdateCart={handleUpdateCart} />
    </>
  );
};

export default ListProducts;
