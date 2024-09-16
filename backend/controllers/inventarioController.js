import express from 'express';
import { createRegistro, getRegistros } from '../services/inventariosService.js';
import { readPagos, savePagos } from '../services/pagosService.js';

const router = express.Router();

// Registrar una nueva entrada de registro
router.post('/registrar', async (req, res) => {
  try {
    const { empresa, fecha, hora, productos, costoTotal } = req.body;

    if (!empresa || !fecha || !hora || !productos || costoTotal === undefined) {
      return res.status(400).json({ error: 'Todos los campos son necesarios' });
    }

    const nuevoRegistro = await createRegistro(empresa, fecha, hora, productos, costoTotal);
    res.status(201).json(nuevoRegistro);
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar la información' });
  }
});

// Obtener todos los registros
router.get('/', async (req, res) => {
  try {
    const registros = await getRegistros();
    res.json(registros);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los registros' });
  }
});

router.post('/pagos', async (req, res) => {
  const { empresa, productos, costoTotal } = req.body;

  try {
    const pagos = readPagos(); // Lee los pagos existentes

    // Obtener el último código
    const ultimoCodigo = pagos.length > 0 ? pagos[pagos.length - 1].codigo : 0;
    const nuevoCodigo = ultimoCodigo + 1; // Autoincrementa el último código

    // Configuración para la fecha y hora en zona horaria de Colombia
    const optionsFecha = { year: 'numeric', month: '2-digit', day: '2-digit', timeZone: 'America/Bogota' };
    const optionsHora = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false, timeZone: 'America/Bogota' };

    // Generar fecha y hora en la zona horaria de Colombia
    const fecha = new Intl.DateTimeFormat('es-CO', optionsFecha).format(new Date());
    const hora = new Intl.DateTimeFormat('es-CO', optionsHora).format(new Date());


    const nuevoPago = {
      codigo: nuevoCodigo, // Asigna el nuevo código
      empresa: empresa || '',
      fecha: fecha,
      hora: hora,
      productos,
      valorPago: (costoTotal * -1)
    };

    pagos.push(nuevoPago); // Agrega el nuevo pago a la lista
    savePagos(pagos); // Guarda los pagos actualizados

    res.status(201).json(nuevoPago);
  } catch (error) {
    res.status(500).json({ error: 'Error al guardar el pago' });
  }
});


export default router;
