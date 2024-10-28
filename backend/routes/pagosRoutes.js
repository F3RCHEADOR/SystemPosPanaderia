import express from 'express';
import {
    create,
    getById,
    getPorFecha,
    getPorLocal,
    update,
    getUltimoConsecutivo,
    getPagosPorLocalYFecha,
    remove
} from '../controllers/pagoController.js';

const router = express.Router();

// Crear un nuevo pago
router.post('/', create);

// Obtener un pago por ID
router.get('/pagoId/:id', getById);

// Obtener el último consecutivo
router.get('/ultimo-consecutivo', getUltimoConsecutivo);

// Obtener el último consecutivo
router.get('/ventasHoy', getPagosPorLocalYFecha);

// Obtener pagos por fecha específica
router.get('/fecha', getPorFecha);

// Obtener pagos por local
router.get('/local/:localId', getPorLocal);

// Actualizar un pago
router.put('/:id', update);

// Eliminar un pago
router.delete('/:id', remove);

export default router;
