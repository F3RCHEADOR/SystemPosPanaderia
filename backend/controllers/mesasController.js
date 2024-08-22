import express from 'express';
import { readMesas, saveMesas } from '../services/mesasService.js';

const router = express.Router();

// Obtener todas las mesas
router.get('/', (req, res) => {
  try {
    const mesas = readMesas();
    res.json(mesas);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las mesas' });
  }
});

// Actualizar los datos de una mesa
router.put('/:codigo', (req, res) => {
  const { codigo } = req.params;
  const { productos, valorAcumulado, estado, horaOcupado } = req.body;

  try {
    const mesas = readMesas();
    const mesaIndex = mesas.findIndex(mesa => mesa.codigo === codigo);

    if (mesaIndex === -1) {
      return res.status(404).json({ error: 'Mesa no encontrada' });
    }

    // Actualizar los campos de la mesa
    mesas[mesaIndex].productos = productos;
    mesas[mesaIndex].valorAcumulado = valorAcumulado;
    mesas[mesaIndex].estado = estado || mesas[mesaIndex].estado;
    console.log(mesas[mesaIndex].estado) // Actualiza el estado si se proporciona
    mesas[mesaIndex].horaOcupado = horaOcupado || mesas[mesaIndex].horaOcupado; // Actualiza la hora si se proporciona

    saveMesas(mesas);
    res.json(mesas[mesaIndex]);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la mesa' });
  }
});

export default router;
