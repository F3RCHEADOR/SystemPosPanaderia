import express from 'express';
import { createCaja, getCajas } from '../services/cajaService.js';

const router = express.Router();

// Registrar una nueva apertura o cierre de caja
router.post('/registrar', async (req, res) => {
  try {
    const { tipoCaja, fecha, hora, tipoMoneda, totalCaja } = req.body;

    if (!tipoCaja || !fecha || !hora || !tipoMoneda || totalCaja === undefined) {
      return res.status(400).json({ error: 'Todos los campos son necesarios' });
    }

    const nuevoRegistro = await createCaja(tipoCaja, fecha, hora, tipoMoneda, totalCaja);
    res.status(201).json(nuevoRegistro);
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar apertura o cierre de caja' });
  }
});

// Obtener todos los registros de aperturas y cierres de caja
router.get('/', async (req, res) => {
  try {
    const registros = await getCajas();
    res.json(registros);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los registros de caja' });
  }
});

export default router;
