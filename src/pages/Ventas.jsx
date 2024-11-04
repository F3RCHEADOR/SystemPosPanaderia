// src/Ventas.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const backend = import.meta.env.VITE_BUSINESS_BACKEND;
const localId = localStorage.getItem("localId");

const Ventas = () => {
  const [ventas, setVentas] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(16); // 4x4 = 16 items
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fechaSeleccionada, setFechaSeleccionada] = useState(new Date().toISOString().slice(0, 10)); // Fecha por defecto hoy

  useEffect(() => {
    const fetchVentas = async () => {
      setLoading(true); // Comienza la carga
      setError(null); // Reinicia el error
      try {
        const response = await axios.get(`${backend}api/pagos/ventasHoy`, {
          params: {
            localId: localId,
            fecha: fechaSeleccionada // Usar la fecha seleccionada
          }
        });
        setVentas(response.data);
        console.log(ventas)
      } catch (error) {
        setError("Error al cargar las ventas. Intenta nuevamente.");
        console.error("Error fetching ventas:", error);
      } finally {
        setLoading(false); // Finaliza la carga
      }
    };

    fetchVentas();
  }, [localId, fechaSeleccionada]); // Volver a cargar los datos cuando cambia la fecha

  // Calcular las ventas actuales según la página
  const indexOfLastVenta = currentPage * itemsPerPage;
  const indexOfFirstVenta = indexOfLastVenta - itemsPerPage;
  const currentVentas = ventas.slice(indexOfFirstVenta, indexOfLastVenta);

  // Cambiar de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Total de páginas
  const totalPages = Math.ceil(ventas.length / itemsPerPage);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Ventas del Día</h2>
      <div className="mb-4 flex justify-center">
        <input
          type="date"
          value={fechaSeleccionada}
          onChange={(e) => setFechaSeleccionada(e.target.value)}
          className="border border-gray-300 rounded p-2 mr-4 focus:ring-2 focus:ring-blue-500 transition duration-200"
        />
        <button 
          onClick={() => setFechaSeleccionada(new Date().toISOString().slice(0, 10))}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
        >
          Hoy
        </button>
      </div>
      {loading ? (
        <div className="flex justify-center">
          <div className="loader"></div>
        </div>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
          {currentVentas.map((venta) => (
            <div key={venta._id} className="p-4 bg-gray-200 rounded-lg shadow-md transition-transform transform hover:scale-105">
              <h3 className="font-semibold">Consecutivo: {venta.consecutivo}</h3>
              <p>Nombre: {venta.nombre}</p>
              <p className="font-bold text-lg text-green-600">Monto Total: ${venta.valorTotal}</p>
              <p>Fecha: {new Date(venta.creado).toLocaleDateString()}</p>
              <h4 className="font-semibold mt-2">Productos:</h4>
              <ul className="list-disc list-inside">
                {venta.productos.map((producto) => (
                  <li key={producto._id}>
                    {producto.nombreProducto} - Cantidad: {producto.cantidad} - Total: ${producto.valorTotal}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={`mx-1 px-3 py-1 rounded transition duration-200 ${
              currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300 hover:bg-gray-400'
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
      <style jsx>{`
        .loader {
          border: 4px solid #f3f3f3; /* Light grey */
          border-top: 4px solid #3498db; /* Blue */
          border-radius: 50%;
          width: 40px;
          height: 40px;
          animation: spin 2s linear infinite;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Ventas;
