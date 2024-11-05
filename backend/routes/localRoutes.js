import express from 'express';
import { create, getAll, getById, update, remove } from '../controllers/localController.js';

const router = express.Router();

// Crear un nuevo local
router.post('/', create);

// Obtener todos los locales
router.get('/', getAll);

// Obtener un local por ID
router.get('/:id', getById);

// Actualizar un local
router.put('/:id', update);

// Eliminar un local
router.delete('/:id', remove);

export default router;
