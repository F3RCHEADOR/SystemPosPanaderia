import express from 'express';
import {
    createCaja,
    getCajas,
    getCajaById,
    getCajasPorFecha,
    updateCaja,
    deleteCaja
} from '../services/cajaService.js';

import Caja from '../models/Caja.js';

const router = express.Router();

export const create = async (req, res) => {
    try {
        console.log(req.body); // Esto te ayudará a verificar si el cuerpo de la solicitud es correcto
        const { consecutivo, tipoCaja, tipoMoneda, totalCaja } = req.body;
        const nuevaCaja = await createCaja(consecutivo, tipoCaja, tipoMoneda, totalCaja);
        res.status(201).json(nuevaCaja);
    } catch (error) {
        console.error('Error al crear la caja:', error); // Muestra el error en la consola
        res.status(500).json({ error: error.message || 'Error al crear la caja' });
    }
};


// Obtener el último consecutivo
export const getUltimoConsecutivo = async (req, res) => {
    try {
        console.log('Controlador getUltimoConsecutivo llamado');
        const ultimoPago = await Caja.findOne({}, {}, { sort: { consecutivo: -1 } });
        const consecutivo = ultimoPago ? ultimoPago.consecutivo : 1;
        console.log('Último consecutivo encontrado:', consecutivo);
        res.json({ consecutivo });
    } catch (error) {
        console.error('Error al obtener el último consecutivo:', error);
        res.status(500).json({ error: 'Error al obtener el último consecutivo' });
    }
};

// Obtener el último consecutivo
export const getUltimaCaja = async (req, res) => {
    try {
        const ultimaCaja = await Caja.findOne({}, {}, { sort: { consecutivo: -1 } });
        res.json({ ultimaCaja });
    } catch (error) {
        console.error('Error al obtener la ultima caja:', error);
        res.status(500).json({ error: 'Error al obtener la ultima caja' });
    }
};


// Obtener todas las cajas
export const getAll = async (req, res) => {
    try {
        const cajas = await getCajas();
        res.json(cajas);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las cajas' });
    }
};

// Obtener una caja por ID
export const getById = async (req, res) => {
    try {
        const caja = await getCajaById(req.params.id);
        if (!caja) {
            return res.status(404).json({ error: 'Caja no encontrada' });
        }
        res.json(caja);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener la caja' });
    }
};

// Obtener todas las cajas por fecha
export const getPorFecha = async (req, res) => {
    try {
        const { fecha } = req.query; // Espera la fecha en la query
        const cajas = await getCajasPorFecha(fecha);
        res.json(cajas);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las cajas por fecha' });
    }
};

// Actualizar una caja
export const update = async (req, res) => {
    try {
        const actualizado = await updateCaja(req.params.id, req.body);
        if (!actualizado) {
            return res.status(404).json({ error: 'Caja no encontrada' });
        }
        res.json(actualizado);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar la caja' });
    }
};

// Eliminar una caja
export const remove = async (req, res) => {
    try {
        const eliminado = await deleteCaja(req.params.id);
        if (!eliminado) {
            return res.status(404).json({ error: 'Caja no encontrada' });
        }
        res.status(204).send(); // No content
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la caja' });
    }
};

export default router;
