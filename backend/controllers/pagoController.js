import express from 'express';
import {
    createPago,
    getPagoById,
    updatePago,
    deletePago,
    getPagosPorFecha,
    getPagosPorLocal
} from '../services/pagosService.js';

import Pago from '../models/Pagos.js';

const router = express.Router();

// Crear un nuevo pago
export const create = async (req, res) => {
    try {
        console.log(req.body);
        const { consecutivo, nombre, productos, valorTotal, localId } = req.body;
        // Crear el nuevo pago
        const nuevoPago = await createPago(consecutivo, nombre, productos, valorTotal, localId);
        console.log(nuevoPago)
        res.status(201).json(nuevoPago);
    } catch (error) {
        console.error(error); // Imprime el error en la consola del servidor
        res.status(500).json({ error: 'Error al crear el pago' });
    }

};

// Obtener el último consecutivo
export const getUltimoConsecutivo = async (req, res) => {
    try {
        console.log('Controlador getUltimoConsecutivo llamado');
        const ultimoPago = await Pago.findOne({}, {}, { sort: { consecutivo: -1 } });
        const consecutivo = ultimoPago ? ultimoPago.consecutivo : 0; // Devuelve 0 si no hay pagos
        console.log('Último consecutivo encontrado:', consecutivo);
        res.json({ consecutivo });
    } catch (error) {
        console.error('Error al obtener el último consecutivo:', error);
        res.status(500).json({ error: 'Error al obtener el último consecutivo' });
    }
};


// Obtener un pago por ID
export const getById = async (req, res) => {
    try {
        const pago = await getPagoById(req.params.id);
        if (!pago) {
            return res.status(404).json({ error: 'Pago no encontrado' });
        }
        res.json(pago);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el pago' });
    }
};

// Obtener pagos por fecha específica
export const getPorFecha = async (req, res) => {
    try {
        const { fecha } = req.query; // Espera la fecha en la query
        const pagos = await getPagosPorFecha(fecha);
        res.json(pagos);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los pagos por fecha' });
    }
};

// Obtener pagos por local y fecha
export const getPagosPorLocalYFecha = async (req, res) => {
    try {
        const { localId, fecha } = req.query; // Espera el localId y la fecha en la query
        
        if (!localId || !fecha) {
            return res.status(400).json({ error: 'Se requiere localId y fecha' });
        }

        // Filtrar por fecha
        const startDate = new Date(fecha);
        const endDate = new Date(fecha);
        endDate.setDate(endDate.getDate() + 1); // Añadir un día para cubrir todo el día

        const pagos = await Pago.find({
            localId: localId,
            creado: { // Asegúrate de que 'creado' es el campo donde guardas la fecha
                $gte: startDate,
                $lt: endDate
            }
        });

        res.json(pagos);
    } catch (error) {
        console.error('Error al obtener pagos:', error);
        res.status(500).json({ error: 'Error al obtener los pagos' });
    }
};


// Obtener pagos por local
export const getPorLocal = async (req, res) => {
    try {
        const pagos = await getPagosPorLocal(req.params.localId);
        res.json(pagos);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los pagos por local' });
    }
};

// Actualizar un pago
export const update = async (req, res) => {
    try {
        const actualizado = await updatePago(req.params.id, req.body);
        if (!actualizado) {
            return res.status(404).json({ error: 'Pago no encontrado' });
        }
        res.json(actualizado);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el pago' });
    }
};

// Eliminar un pago
export const remove = async (req, res) => {
    try {
        const eliminado = await deletePago(req.params.id);
        if (!eliminado) {
            return res.status(404).json({ error: 'Pago no encontrado' });
        }
        res.status(204).send(); // No content
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el pago' });
    }
};

export default router;
