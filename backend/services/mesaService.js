// services/mesaService.js
import Mesa from '../models/Mesa.js'; // Asegúrate de que la ruta sea correcta

// Crear una nueva mesa
export const createMesa = async (nombre, imagen, pisoId) => {
    const nuevaMesa = new Mesa({ nombre, imagen, piso: pisoId });
    return await nuevaMesa.save();
};


// Obtener todas las mesas
export const getMesas = async () => {
    return await Mesa.find().populate('piso').populate('productos.productoId');
};

// Obtener una mesa por ID
export const getMesaById = async (id) => {
    return await Mesa.findById(id).populate('piso').populate('productos.productoId');
};

export const getMesasByPiso = async (pisoId) => {
  return await Mesa.find({ piso: pisoId }).populate('piso').populate('productos.productoId');
};

// Actualizar una mesa
export const updateMesa = async (id, updatedData) => {
    return await Mesa.findByIdAndUpdate(id, updatedData, { new: true });
};

// Eliminar una mesa
export const deleteMesa = async (id) => {
    const mesa = await Mesa.findByIdAndDelete(id);
    return mesa !== null; // Devuelve true si se eliminó
};
