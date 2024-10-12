import express from 'express';
import { create, getAllByLocal, getById, update, remove } from '../controllers/productoController.js';

const router = express.Router();

// Crear un nuevo producto
router.post('/', create);

// Obtener todos los productos
router.get('/', getAllByLocal);

// Obtener un producto por ID
router.get('/:id', getById);

// Actualizar un producto
router.put('/:id', update);

// Eliminar un producto
router.delete('/:id', remove);

export default router;
