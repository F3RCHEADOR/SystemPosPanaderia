import Cliente from '../models/Cliente.js';

// Crear un nuevo cliente
export const createCliente = async (nombre, productos, localId) => {
    const nuevoCliente = new Cliente({ nombre, productos, localId });
    return await nuevoCliente.save();
};

// Obtener todos los clientes de un local específico
export const getClientesByLocal = async (localId) => {
    return await Cliente.find({ localId });
};

// Obtener un cliente por ID
export const getClienteById = async (id) => {
    return await Cliente.findById(id).populate('productos.productoId'); // Para obtener los detalles del producto
};

// Actualizar un cliente
export const updateCliente = async (id, updatedData) => {
    return await Cliente.findByIdAndUpdate(id, updatedData, { new: true });
};

// Eliminar un cliente
export const deleteCliente = async (id) => {
    const cliente = await Cliente.findByIdAndDelete(id);
    return cliente !== null; // Devuelve true si se eliminó
};
