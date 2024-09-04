import express from 'express';
import { readClientes, saveClientes } from '../services/clientesService.js';
import { readPagos, savePagos } from '../services/pagosService.js';

const router = express.Router();

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

router.post('/pagos', (req, res) => {
  const { empresa, fecha, hora, productos, valorPago } = req.body;

  try {
    const pagos = readPagos(); // Lee los pagos existentes

    const nuevoPago = {
      empresa: empresa || '',
      fecha: new Date().toLocaleDateString(), // Formato de fecha
      hora: new Date().toLocaleTimeString(), // Formato de hora
      productos,
      valorPago
    };

    pagos.push(nuevoPago); // Agrega el nuevo pago a la lista
    savePagos(pagos); // Guarda los pagos actualizados

    res.status(201).json(nuevoPago);
  } catch (error) {
    res.status(500).json({ error: 'Error al guardar el pago' });
  }
});


export default router;
