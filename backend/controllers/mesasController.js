import express from 'express';
import { readMesas, saveMesas } from '../services/mesasService.js';
import { readPagos, savePagos } from '../services/pagosService.js';

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
router.put('/:codigo/actualizar', (req, res) => {
  const { codigo } = req.params;
  const { productos, valorAcumulado, estado, horaOcupado } = req.body;

  try {
    const mesas = readMesas();
    const mesaIndex = mesas.findIndex(mesa => mesa.codigo === codigo);

    if (mesaIndex === -1) {
      return res.status(404).json({ error: 'Mesa no encontrada' });
    }

    // Actualizar los campos de la mesa
    mesas[mesaIndex].productos = productos || mesas[mesaIndex].productos;
    mesas[mesaIndex].valorAcumulado = valorAcumulado || mesas[mesaIndex].valorAcumulado;
    mesas[mesaIndex].estado = estado || mesas[mesaIndex].estado;
    mesas[mesaIndex].horaOcupado = horaOcupado || mesas[mesaIndex].horaOcupado;
    mesas[mesaIndex].tipoCliente = 'Mesa';

    saveMesas(mesas);
    res.json(mesas[mesaIndex]);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la mesa' });
  }
});


router.put('/:codigo/desocupar', (req, res) => {
  const { codigo } = req.params;

  try {
    const mesas = readMesas();
    const mesaIndex = mesas.findIndex(mesa => mesa.codigo === codigo);

    if (mesaIndex === -1) {
      return res.status(404).json({ error: 'Mesa no encontrada' });
    }

    // Editar la mesa
    mesas[mesaIndex].horaDesocupado = ''; // Cambia según lo que necesites
    mesas[mesaIndex].estado = 'Desocupado'; // Cambia el estado a "Desocupado"
    mesas[mesaIndex].productos = '';
    mesas[mesaIndex].tipoCliente = 'Mesa';

    saveMesas(mesas);
    res.status(200).json({ message: 'Mesa actualizada correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la mesa' });
  }
});



router.post('/pagos',async (req, res) => {
  const { empresa, fecha, hora, productos, valorAcumulado } = req.body;

  try {
    const pagos = readPagos(); // Lee los pagos existentes

     // Obtener el último código
     const ultimoCodigo = pagos.length > 0 ? pagos[pagos.length - 1].codigo : 0;
     const nuevoCodigo = ultimoCodigo + 1; // Autoincrementa el último código

    const nuevoPago = {
      codigo: nuevoCodigo, // Asigna el nuevo código
      empresa: empresa || '',
      fecha: new Date().toLocaleDateString(), // Formato de fecha
      hora: new Date().toLocaleTimeString(), // Formato de hora
      productos,
      valorPago: valorAcumulado
    };

    pagos.push(nuevoPago); // Agrega el nuevo pago a la lista
    savePagos(pagos); // Guarda los pagos actualizados

    res.status(201).json(nuevoPago);
  } catch (error) {
    res.status(500).json({ error: 'Error al guardar el pago' });
  }
});



export default router;
