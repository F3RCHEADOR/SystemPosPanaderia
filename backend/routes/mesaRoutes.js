// routes/mesaRoutes.js
import express from 'express';
import { create, getAll, getById, update, remove, getByPiso } from '../controllers/mesaController.js';

const router = express.Router();

// Crear una nueva mesa
router.post('/', create);

// Obtener todas las mesas
router.get('/', getAll);

// Obtener una mesa por ID
router.get('/:id', getById);

// Obtener mesas por piso
router.get('/piso/:pisoId', getByPiso);

// Actualizar una mesa
router.put('/:id', update);

// Eliminar una mesa
router.delete('/:id', remove);

export default router;
