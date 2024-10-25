import Local from '../models/Local.js'; // Asegúrate de que la ruta sea correcta

// Crear un nuevo local
export const createLocal = async (nombre, nit, planSuscripcion) => {
    const nuevoLocal = new Local({ nombre, nit, planSuscripcion });
    return await nuevoLocal.save();
};

// Obtener todos los locales
export const getLocales = async () => {
    return await Local.find();
};

// Obtener un local por ID
export const getLocalById = async (id) => {
    return await Local.findById(id);
};

// Actualizar un local
export const updateLocal = async (id, updatedData) => {
    return await Local.findByIdAndUpdate(id, updatedData, { new: true });
};

// Eliminar un local
export const deleteLocal = async (id) => {
    const local = await Local.findByIdAndDelete(id);
    return local !== null; // Devuelve true si se eliminó
};
