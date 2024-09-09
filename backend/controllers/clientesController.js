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
    const horaLlegada = new Date().toLocaleTimeString('en-GB', { hour12: false });

    const nuevoCliente = {
      codigo: newCodigo,
      horaLlegada,
      productos,
      valorAcumulado
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
      horaLlegada
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
  const { empresa, fecha, hora, productos, valorAcumulado } = req.body;

  try {
    const pagos = readPagos(); // Lee los pagos existentes

    const nuevoPago = {
      empresa: empresa || '',
      fecha: new Date().toLocaleDateString(), // Formato de fecha
      hora: new Date().toLocaleTimeString(), // Formato de hora
      productos,
      valorPago: valorAcumulado
    };

    pagos.push(nuevoPago); // Agrega el nuevo pago a la lista
    savePagos(pagos); // Guarda los pagos actualizados

    // Comando para abrir la caja
    const openDrawerCommand = Buffer.from([0x1B, 0x70, 0x00, 0x19, 0xFF, 0xFF]); // Ajusta el comando si es necesario

    // Verifica si el puerto está abierto antes de escribir
    if (!port.isOpen) {
      await new Promise((resolve, reject) => {
        port.open((err) => {
          if (err) {
            return reject(err);
          }
          resolve();
        });
      });
    }

    await new Promise((resolve, reject) => {
      port.write(openDrawerCommand, (err) => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });

    console.log('Caja abierta');
    res.status(201).json(nuevoPago);
  } catch (error) {
    console.error('Error al procesar el pago o abrir la caja', error);
    res.status(500).json({ error: 'Error al guardar el pago o abrir la caja registradora' });
  }
});





export default router;
