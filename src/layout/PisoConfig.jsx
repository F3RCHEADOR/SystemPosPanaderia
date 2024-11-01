import React, { useEffect, useState } from "react";
import axios from "axios";
import UpdateMesaModal from "../components/LocalConfig/UpdateCreateModalMesa";

const backend = import.meta.env.VITE_BUSINESS_BACKEND;
const localId = localStorage.getItem("localId");

const PisoPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mesaToUpdate, setMesaToUpdate] = useState(null);
  const [pisos, setPisos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPisos = async () => {
      try {
        const response = await axios.get(`${backend}api/pisos/local/${localId}`);
        setPisos(response.data);
      } catch (error) {
        console.error("Error al cargar los pisos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPisos();
  }, []);

  const handleOpenCreateModal = () => {
    setMesaToUpdate(null);
    setIsModalOpen(true);
  };

  const handleOpenUpdateModal = (mesa) => {
    setMesaToUpdate(mesa);
    setIsModalOpen(true);
  };

  const handleSubmit = async (mesaData) => {
    const mesaPayload = {
      nombre: mesaData.nombre,
      imagen: mesaData.imagen, // La imagen seleccionada
      piso: mesaData.piso, // Usamos el ID del piso seleccionado desde el modal
    };
    console.log(mesaPayload)

    try {
      if (mesaToUpdate) {
        // Actualizar mesa
        await axios.put(`${backend}api/mesas/${mesaToUpdate._id}`, mesaPayload);
      } else {
        // Crear nueva mesa
        await axios.post(`${backend}api/mesas`, mesaPayload);
      }
      await fetchPisos(); // Refresca los datos
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error al guardar la mesa:", error);
    }
  };

  const handleDeleteMesa = async (mesaId) => {
    try {
      await axios.delete(`${backend}api/mesas/${mesaId}`);
      await fetchPisos(); // Refresca los datos después de eliminar
    } catch (error) {
      console.error("Error al eliminar la mesa:", error);
    }
  };

  if (loading) {
    return <div className="text-center p-4">Cargando mesas...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Gestión de Mesas</h1>
      <button
        onClick={handleOpenCreateModal}
        className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4"
      >
        Crear Mesa
      </button>
      {pisos.map((piso) => (
        <div key={piso._id} className="mb-6 border rounded-lg shadow-md p-4">
          <h2 className="text-xl font-semibold mb-2">{piso.nombre}</h2>
          {piso.mesas && piso.mesas.length > 0 ? (
            piso.mesas.map((mesa) => (
              <div key={mesa._id} className="flex justify-between items-center border-b py-2">
                <span>{mesa.nombre}</span>
                <div>
                  <button
                    onClick={() => handleOpenUpdateModal(mesa)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded-md mr-2"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDeleteMesa(mesa._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded-md"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No hay mesas en este piso.</p>
          )}
        </div>
      ))}

      <UpdateMesaModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        mesa={mesaToUpdate}
        pisos={pisos} // Pasa la lista de pisos
      />
    </div>
  );
};

export default PisoPage;
