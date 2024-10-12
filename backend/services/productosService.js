import Producto from '../models/Productos.js';

// Crear un nuevo producto
export const createProducto = async (nombre, precio, iva, categoriaId, localId) => {
    const nuevoProducto = new Producto({ nombre, precio, iva, categoriaId, localId });
    return await nuevoProducto.save();
};

// Obtener todos los productos de un local específico
export const getProductosByLocal = async (localId) => {
    return await Producto.find({ localId });
};

// Obtener un producto por ID
export const getProductoById = async (id) => {
    return await Producto.findById(id);
};

// Actualizar un producto
export const updateProducto = async (id, updatedData) => {
    return await Producto.findByIdAndUpdate(id, updatedData, { new: true });
};

// Eliminar un producto
export const deleteProducto = async (id) => {
    const producto = await Producto.findByIdAndDelete(id);
    return producto !== null; // Devuelve true si se eliminó
};
