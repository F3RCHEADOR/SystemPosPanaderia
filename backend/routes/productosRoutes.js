import express from 'express';
import { create, getAllByLocal,getAllByCategory, getById, update, remove } from '../controllers/productoController.js';

const router = express.Router();

// Crear un nuevo producto
router.post('/', create);

// Obtener todos los productos por local
router.get('/local/:localId', getAllByLocal);

// Cambia la ruta para que use `:categoriaId`
router.get('/categoria/:categoriaId', getAllByCategory);


// Obtener un producto por ID
router.get('/:id', getById);

// Actualizar un producto
router.put('/:id', update);

// Eliminar un producto
router.delete('/:id', remove);

export default router;
