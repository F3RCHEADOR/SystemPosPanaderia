import express from 'express';
import {
    create,
    getById,
    getPorFecha,
    getPorLocal,
    update,
    remove
} from '../controllers/pagoController.js';

const router = express.Router();

// Crear un nuevo pago
router.post('/', create);

// Obtener un pago por ID
router.get('/:id', getById);

// Obtener pagos por fecha específica
router.get('/fecha', getPorFecha);

// Obtener pagos por local
router.get('/local/:localId', getPorLocal);

// Actualizar un pago
router.put('/:id', update);

// Eliminar un pago
router.delete('/:id', remove);

export default router;
