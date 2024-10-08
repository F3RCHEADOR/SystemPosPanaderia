import express from 'express';
import { readClientes, saveClientes } from '../services/clientesService.js';
import { readPagos, savePagos } from '../services/pagosService.js';
import { SerialPort } from 'serialport'; // Nota el uso de "SerialPort" en lugar de "SerialPort()"

const router = express.Router();
// Configura el puerto serial
// Ajusta esto a la ruta correcta de tu puerto serial
const portPath = '/dev/tty-usbserial1'; // Cambia esto según tu configuración
const port = new SerialPort({
  path: portPath,
  baudRate: 9600
});

port.on('error', (err) => {
  console.error('Error en el puerto serial:', err.message);
});

router.get('/', (req, res) => {
  try {
    const clientes = readClientes();
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los clientes' });
  }
});

router.get('/:codigo', (req, res) => {
  const { codigo } = req.params;

  try {
    const clientes = readClientes();
    const cliente = clientes.find(cliente => cliente.codigo === codigo);

    if (cliente) {
      res.json(cliente);
    } else {
      res.status(404).json({ error: 'Cliente no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los datos del cliente' });
  }
});

router.post('/', (req, res) => {
  const { productos, valorAcumulado } = req.body;

  try {
    const clientes = readClientes();
    const newCodigo = `C${String(clientes.length + 1).padStart(3, '0')}`;
    const horaLlegada = new Date().toLocaleTimeString('es-CO', { hour12: false });

    const nuevoCliente = {
      codigo: newCodigo,
      horaLlegada,
      productos,
      valorAcumulado,
      tipoCliente: 'Individual'
    };

    clientes.push(nuevoCliente);
    saveClientes(clientes);
    res.status(201).json(nuevoCliente);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el cliente' });
  }
});


// Actualizar un cliente existente
router.put('/:codigo', (req, res) => {
  const { codigo } = req.params;
  const { productos, valorAcumulado, horaLlegada } = req.body;

  try {
    const clientes = readClientes();
    const clienteIndex = clientes.findIndex(cliente => cliente.codigo === codigo);

    if (clienteIndex === -1) {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }

    const clienteActualizado = {
      ...clientes[clienteIndex],
      productos,
      valorAcumulado,
      horaLlegada,
      tipoCliente: 'Individual'
    };

    clientes[clienteIndex] = clienteActualizado;
    saveClientes(clientes);
    res.status(200).json(clienteActualizado);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el cliente' });
  }
});


router.delete('/:codigo', (req, res) => {
  const { codigo } = req.params;

  try {
    const clientes = readClientes();
    const clienteIndex = clientes.findIndex(cliente => cliente.codigo === codigo);

    if (clienteIndex === -1) {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }

    // Eliminar el cliente
    clientes.splice(clienteIndex, 1);

    // Reordenar los códigos de cliente
    for (let i = 0; i < clientes.length; i++) {
      clientes[i].codigo = `C${(i + 1).toString().padStart(3, '0')}`;
    }

    saveClientes(clientes);
    res.status(200).json({ message: 'Cliente eliminado y códigos actualizados' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el cliente' });
  }
});



router.post('/pagos', async (req, res) => {
  const { empresa, productos, valorAcumulado } = req.body;

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
