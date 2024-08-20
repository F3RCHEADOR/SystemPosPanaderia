// controllers/clientesController.js
import express from 'express';
import { readClientes, saveClientes } from '../services/clientesService.js';

const router = express.Router();

router.get('/', (req, res) => {
  try {
    const clientes = readClientes();
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los clientes' });
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

export default router;
