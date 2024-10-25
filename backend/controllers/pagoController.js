import express from 'express';
import {
    createPago,
    getPagoById,
    updatePago,
    deletePago,
    getPagosPorFecha,
    getPagosPorLocal
} from '../services/pagosService.js';

const router = express.Router();

// Crear un nuevo pago
export const create = async (req, res) => {
    try {
        console.log(req.body)
        const { consecutivo, nombre, productos, valorTotal, localId } = req.body;
        const nuevoPago = await createPago(consecutivo, nombre, productos, valorTotal, localId);
        res.status(201).json(nuevoPago);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el pago' });
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
