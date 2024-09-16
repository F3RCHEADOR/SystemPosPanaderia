import express from 'express';
import { readPagos, savePagos } from '../services/pagosService.js';

const router = express.Router();



// Obtener todos los pagos
router.get('/', (req, res) => {
  try {
    const pagos = readPagos(); // Lee los pagos desde el servicio
    res.json(pagos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los pagos' });
  }
});

// Obtener un pago específico por su código
router.get('/:codigo', (req, res) => {
  const { codigo } = req.params;

  try {
    const pagos = readPagos();
    const pago = pagos.find(pago => pago.codigo === Number(codigo));

    if (pago) {
      res.json(pago);
    } else {
      res.status(404).json({ error: 'Pago no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los datos del pago' });
  }
});

router.post('/', (req, res) => {
  const { empresa, productos, valorPago } = req.body;

  try {
    const pagos = readPagos();

    // Genera un nuevo código autoincremental
    const ultimoCodigo = pagos.length > 0 ? pagos[pagos.length - 1].codigo : 0;
    const nuevoCodigo = ultimoCodigo + 1;

    // Usar Intl.DateTimeFormat para Colombia
    const fecha = new Intl.DateTimeFormat('es-CO', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      timeZone: 'America/Bogota'
    }).format(new Date());

    const hora = new Intl.DateTimeFormat('es-CO', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
      timeZone: 'America/Bogota'
    }).format(new Date());

    const nuevoPago = {
      codigo: nuevoCodigo,
      empresa: empresa || '',
      fecha: fecha,
      hora: hora,
      productos,
      valorPago
    };

    pagos.push(nuevoPago);
    savePagos(pagos); // Guarda el nuevo pago

    res.status(201).json(nuevoPago);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el pago' });
  }
});


// Actualizar un pago existente por su código
router.put('/:codigo', (req, res) => {
  const { codigo } = req.params;
  const { empresa, productos, valorPago } = req.body;

  try {
    const pagos = readPagos();
    const pagoIndex = pagos.findIndex(pago => pago.codigo === Number(codigo));

    if (pagoIndex === -1) {
      return res.status(404).json({ error: 'Pago no encontrado' });
    }

    const pagoActualizado = {
      ...pagos[pagoIndex],
      empresa: empresa || pagos[pagoIndex].empresa,
      productos: productos || pagos[pagoIndex].productos,
      valorPago: valorPago || pagos[pagoIndex].valorPago
    };

    pagos[pagoIndex] = pagoActualizado;
    savePagos(pagos); // Guarda los cambios

    res.status(200).json(pagoActualizado);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el pago' });
  }
});

// Eliminar un pago por su código
router.delete('/:codigo', (req, res) => {
  const { codigo } = req.params;

  try {
    const pagos = readPagos();
    const pagoIndex = pagos.findIndex(pago => pago.codigo === Number(codigo));

    if (pagoIndex === -1) {
      return res.status(404).json({ error: 'Pago no encontrado' });
    }

    pagos.splice(pagoIndex, 1); // Elimina el pago
    savePagos(pagos); // Guarda los pagos actualizados

    res.status(200).json({ message: 'Pago eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el pago' });
  }
});

export default router;
