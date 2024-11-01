// services/pisoService.js
import Piso from "../models/Piso.js"; // Asegúrate de que la ruta sea correcta

// Crear un nuevo piso
export const createPiso = async (nombre, localId) => {
  const nuevoPiso = new Piso({ nombre, localId });
  return await nuevoPiso.save();
};

// Obtener todos los pisos
export const getPisos = async () => {
  return await Piso.find().populate("localId")
};

// Obtener un piso por ID
export const getPisoById = async (id) => {
  return await Piso.findById(id).populate("localId")
};

// Obtener pisos por local
export const getPisosByLocal = async (localId) => {
  return await Piso.find({ localId }).populate("localId")
};

// Actualizar un piso
export const updatePiso = async (id, updatedData) => {
  return await Piso.findByIdAndUpdate(id, updatedData, { new: true });
};

// Eliminar un piso
export const deletePiso = async (id) => {
  const piso = await Piso.findByIdAndDelete(id);
  return piso !== null; // Devuelve true si se eliminó
};
