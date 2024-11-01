// routes/pisoRoutes.js
import express from 'express';
import { create, getAll, getById, update, remove, getByLocal } from '../controllers/pisoController.js';

const router = express.Router();

// Crear un nuevo piso
router.post('/', create);

// Obtener todos los pisos
router.get('/', getAll);

// Obtener un piso por ID
router.get('/:id', getById);

// Obtener pisos por local
router.get('/local/:localId', getByLocal);

// Actualizar un piso
router.put('/:id', update);

// Eliminar un piso
router.delete('/:id', remove);

export default router;
