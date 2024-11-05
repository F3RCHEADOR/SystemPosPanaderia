import express from 'express';
import { create, getAll, getById, getUltimoConsecutivo,getUltimaCaja, getPorFecha, update, remove } from '../controllers/cajaController.js';

const router = express.Router();

// Crear una nueva Caja
router.post('/', create);

// Obtener todos las Cajaes
router.get('/', getAll);

// Obtener una Caja por ID
router.get('/cajaId/:id', getById);

// Obtener el último consecutivo
router.get('/ultimo-consecutivo', getUltimoConsecutivo);

// Obtener la ultima caja
router.get('/ultima-caja', getUltimaCaja);

// Obtener un Caja por Fecha
router.get('/:id', getPorFecha);

// Actualizar una Caja
router.put('/:id', update);

// Eliminar una Caja
router.delete('/:id', remove);

export default router;
