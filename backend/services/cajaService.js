import Caja from '../models/Caja.js'; // Asegúrate de que la ruta sea correcta

// Crear una nueva caja
export const createCaja = async ( consecutivo, tipoCaja, tipoMoneda, totalCaja) => {
    const nuevaCaja = new Caja({ consecutivo, tipoCaja, tipoMoneda, totalCaja });
    return await nuevaCaja.save();
};

// Obtener todas las cajas
export const getCajas = async () => {
    return await Caja.find();
};

// Obtener una caja por ID
export const getCajaById = async (id) => {
    return await Caja.findById(id);
};

// Obtener todas las cajas por fecha
export const getCajasPorFecha = async (fecha) => {
    return await Caja.find({ fecha }); // Asegúrate de que la fecha esté en el formato correcto
};

// Actualizar una caja
export const updateCaja = async (id, updatedData) => {
    return await Caja.findByIdAndUpdate(id, updatedData, { new: true });
};

// Eliminar una caja
export const deleteCaja = async (id) => {
    const caja = await Caja.findByIdAndDelete(id);
    return caja !== null; // Devuelve true si se eliminó
};
