import Categoria from '../models/Categoria.js';

// Crear una nueva categoría
export const createCategoria = async (nombre, imagen, localId) => {
    const nuevaCategoria = new Categoria({ nombre, imagen, localId });
    return await nuevaCategoria.save();
};

// Obtener todas las categorías de un local específico
export const getCategoriasByLocal = async (localId) => {
    return await Categoria.find({ localId });
};

// Obtener una categoría por ID
export const getCategoriaById = async (id) => {
    return await Categoria.findById(id);
};

// Actualizar una categoría
export const updateCategoria = async (id, updatedData) => {
    return await Categoria.findByIdAndUpdate(id, updatedData, { new: true });
};

// Eliminar una categoría
export const deleteCategoria = async (id) => {
    return await Categoria.findByIdAndDelete(id);
};
