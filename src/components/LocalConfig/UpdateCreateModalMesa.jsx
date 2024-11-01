import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Importa las imágenes directamente
import barra from "../../assets/Mesa/barra-de-bar.png";
import comedor from "../../assets/Mesa/comedor.png";
import comedor1 from "../../assets/Mesa/comedor1.png";
import exterior from "../../assets/Mesa/exterior.png";
import mesaBar from "../../assets/Mesa/mesa-de-bar.png";
import mesa from "../../assets/Mesa/mesa.png";
import restaurante from "../../assets/Mesa/restaurante.png";
import mesaReuniones from "../../assets/Mesa/sala-de-reuniones.png";

// Define las mesas
const mesas = [
  { id: 1, nombre: "Barra", imagen: barra },
  { id: 2, nombre: "Comedor", imagen: comedor },
  { id: 3, nombre: "Comedor 1", imagen: comedor1 },
  { id: 4, nombre: "Exterior", imagen: exterior },
  { id: 5, nombre: "Mesa Bar", imagen: mesaBar },
  { id: 6, nombre: "Mesa", imagen: mesa },
  { id: 7, nombre: "Restaurante", imagen: restaurante },
  { id: 8, nombre: "Mesa de Reuniones", imagen: mesaReuniones },
];

const UpdateMesaModal = ({ isOpen, onClose, onSubmit, mesa, pisos }) => {
  const [nombre, setNombre] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedPiso, setSelectedPiso] = useState("");

  useEffect(() => {
    if (mesa) {
      setNombre(mesa.nombre);
      setSelectedImage(mesa.imagen);
      setSelectedPiso(mesa.piso); // Asigna el piso actual
    } else {
      setNombre("");
      setSelectedImage("");
      setSelectedPiso(""); // Reinicia al crear nueva mesa
    }
  }, [mesa]);

  const handleImageSelect = (imagen) => {
    setSelectedImage(imagen);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const mesaData = {
      nombre,
      imagen: selectedImage,
      piso: selectedPiso, // Toma el ID del piso seleccionado
    };
    onSubmit(mesaData);
  };

  return (
    <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center ${isOpen ? '' : 'hidden'}`}>
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">{mesa ? "Actualizar Mesa" : "Crear Mesa"}</h2>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label className="block mb-2">Nombre de la Mesa:</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="border rounded p-2 w-full"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">Selecciona un Piso:</label>
            <select
              value={selectedPiso}
              onChange={(e) => setSelectedPiso(e.target.value)}
              className="border rounded p-2 w-full"
              required
            >
              <option value="">Selecciona un piso</option>
              {pisos.map((piso) => (
                <option key={piso._id} value={piso._id}>
                  {piso.nombre}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block mb-2">Selecciona una Imagen:</label>
            <Slider dots={true} infinite={true} speed={500} slidesToShow={1} slidesToScroll={1}>
              {mesas.map((mesa) => (
                <div key={mesa.id} onClick={() => handleImageSelect(mesa.imagen)} className="cursor-pointer">
                  <img src={mesa.imagen} alt={mesa.nombre} className={`w-full ${selectedImage === mesa.imagen ? 'border-2 border-blue-500' : ''}`} />
                </div>
              ))}
            </Slider>
          </div>

          <div className="flex justify-end">
            <button type="button" onClick={onClose} className="bg-gray-300 text-black px-4 py-2 rounded-md mr-2">Cancelar</button>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
              {mesa ? "Actualizar" : "Crear"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateMesaModal;
