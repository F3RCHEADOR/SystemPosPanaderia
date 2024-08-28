import React, { useMemo, useRef } from 'react';
import Client from '../assets/client.png';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import "primereact/resources/themes/lara-light-cyan/theme.css";

const NuevoClienteAside = ({ categorias, quantities, isEdit, clientData }) => {
 
  const toast = useRef(null);

  const calculateTotal = () => {
    return categorias.reduce((acc, categoria) => {
      const totalCategoria = categoria.productos.reduce((total, producto) => {
        return total + producto.precio * (quantities[producto.id] || 0);
      }, 0);
      return acc + totalCategoria;
    }, 0);
  };

  const total = useMemo(() => calculateTotal(), [categorias, quantities]);
  console.log(clientData);

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
      valorAcumulado: total,
      tipoCliente: clientData?.tipoCliente || 'individual' // Default value if not provided
    };

    let response;

    try {
      if (cliente.tipoCliente === "Individual") {
        response = await fetch(`http://localhost:5000/api/clientes${isEdit ? `/${cliente.codigo}` : ''}`, {
          method: isEdit ? 'PUT' : 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(cliente)
        });
      } else if (cliente.tipoCliente === "Mesa") {
        response = await fetch(`http://localhost:5000/api/mesas${isEdit ? `/${cliente.codigo}` : ''}`, {
          method: isEdit ? 'PUT' : 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(cliente)
        });
      } else {
        response = await fetch(`http://localhost:5000/api/clientes`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(cliente)
        });
      }

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
      <aside className='fixed h-full w-56 bg-white border-r-4 flex flex-col items-center justify-start overflow-auto'>
        <h1 className='w-full text-center mt-4 font-bold bg-red-100'>
          {isEdit ? 'Editar Cliente' : 'Cliente Nuevo'}
        </h1>
        <img src={Client} alt="client" className='mx-auto my-4' />
        <h2 className="text-lg font-bold mb-4">Selección:</h2>
        <ul className="w-full px-4">
          {categorias.flatMap(categoria =>
            categoria.productos.filter(producto => quantities[producto.id] > 0).map(producto => (
              <li key={producto.id} className="flex justify-between items-center mb-2">
                <span className="font-semibold text-base">{producto.nombre}</span>
                <span className="text-nowrap bg-green-300 p-1 font-bold">{quantities[producto.id]} x ${producto.precio.toFixed(2)}</span>
              </li>
            ))
          )}
        </ul>
        <div className="w-full px-4 mb-2">
          <hr className="my-2" />
          <div className="flex justify-between items-center font-bold text-xl">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
        <div className="w-full px-4 mt-auto mb-16">
          <Button
            label={isEdit ? "Actualizar Cliente" : "Crear Cliente"}
            onClick={createOrUpdateClient}
            className="p-button-success p-4 flex items-center justify-center mx-auto bg-blue-500 text-white"
          />
        </div>
      </aside>
    </>
  );
};

export default NuevoClienteAside;
