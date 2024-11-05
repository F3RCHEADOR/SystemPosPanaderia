import express from 'express';
import { 
    createLocal, 
    getLocales, 
    getLocalById, 
    updateLocal, 
    deleteLocal 
} from '../services/localService.js';

const router = express.Router();

// Crear un nuevo local
export const create = async (req, res) => {
    try {
        const { nombre, nit, planSuscripcion } = req.body;
        const nuevoLocal = await createLocal(nombre,nit, planSuscripcion);
        res.status(201).json(nuevoLocal);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el local' });
    }
};

// Obtener todos los locales
export const getAll = async (req, res) => {
    try {
        const locales = await getLocales();
        res.json(locales);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los locales' });
    }
};

// Obtener un local por ID
export const getById = async (req, res) => {
    try {
        const local = await getLocalById(req.params.id);
        if (!local) {
            return res.status(404).json({ error: 'Local no encontrado' });
        }
        res.json(local);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el local' });
    }
};

// Actualizar un local
export const update = async (req, res) => {
    try {
        const actualizado = await updateLocal(req.params.id, req.body);
        if (!actualizado) {
            return res.status(404).json({ error: 'Local no encontrado' });
        }
        res.json(actualizado);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el local' });
    }
};

// Eliminar un local
export const remove = async (req, res) => {
    try {
        const eliminado = await deleteLocal(req.params.id);
        if (!eliminado) {
            return res.status(404).json({ error: 'Local no encontrado' });
        }
        res.status(204).send(); // No content
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el local' });
    }
};

export default router;
