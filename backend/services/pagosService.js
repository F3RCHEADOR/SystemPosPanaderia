import Pago from '../models/Pagos.js';

// Crear un nuevo pago
export const createPago = async (consecutivo, nombre, productos, valorTotal, localId) => {
    const nuevoPago = new Pago({ consecutivo, nombre, productos, valorTotal, localId });
    return await nuevoPago.save();
};


// Obtener un pago por ID
export const getPagoById = async (id) => {
    return await Pago.findById(id).populate('productos.productoId'); // Opcional
};

// Obtener pagos por fecha específica
export const getPagosPorFecha = async (fecha) => {
    const inicio = new Date(fecha);
    const fin = new Date(fecha);
    fin.setDate(fin.getDate() + 1); // Añade un día para incluir toda la fecha

    return await Pago.find({ creado: { $gte: inicio, $lt: fin } }).populate('productos.productoId');
};

// Obtener pagos por local
export const getPagosPorLocal = async (localId) => {
    return await Pago.find({ localId }).populate('productos.productoId');
};

// Actualizar un pago
export const updatePago = async (id, updatedData) => {
    return await Pago.findByIdAndUpdate(id, updatedData, { new: true });
};

// Eliminar un pago
export const deletePago = async (id) => {
    const pago = await Pago.findByIdAndDelete(id);
    return pago !== null; // Devuelve true si se eliminó
};
