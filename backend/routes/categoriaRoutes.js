import express from 'express';
import { create, getAllByLocal, getById, update, remove } from '../controllers/categoriaController.js';

const router = express.Router();

// Crear una nueva categoría
router.post('/', create); // Ruta para crear categoría

// Obtener todas las categorías de un local específico
router.get('/:localId', getAllByLocal); // Ruta para obtener todas las categorías por local

// Obtener una categoría por ID
router.get('/:id', getById); // Ruta para obtener categoría por ID

// Actualizar una categoría
router.put('/:id', update); // Ruta para actualizar categoría

// Eliminar una categoría
router.delete('/:id', remove); // Ruta para eliminar categoría

export default router;
