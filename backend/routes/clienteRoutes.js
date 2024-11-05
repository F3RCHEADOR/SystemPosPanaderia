import express from 'express';
import * as clientesController from '../controllers/clienteController.js';

const router = express.Router();

// Ruta para crear un nuevo cliente
router.post('/', clientesController.crearCliente);

// Ruta para obtener todos los clientes de un local específico
router.get('/local/:localId', clientesController.obtenerClientesPorLocal);

// Ruta para obtener un cliente por ID
router.get('/:id', clientesController.obtenerClientePorId);

// Ruta para actualizar un cliente por ID
router.put('/:id', clientesController.actualizarCliente);

// Ruta para eliminar un cliente por ID
router.delete('/:id', clientesController.eliminarCliente);

export default router;
