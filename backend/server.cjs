const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 5000;

const CLIENTES_FILE = path.join(__dirname, 'clientes.json');

app.use(cors());
app.use(express.json());

// Lee los datos del archivo JSON
const readClientes = () => {
  const data = fs.readFileSync(CLIENTES_FILE, 'utf-8');
  return JSON.parse(data);
};

// Guarda los datos en el archivo JSON
const saveClientes = (clientes) => {
  fs.writeFileSync(CLIENTES_FILE, JSON.stringify(clientes, null, 2));
};

// Endpoint para obtener todos los clientes
app.get('/api/clientes', (req, res) => {
  const clientes = readClientes();
  res.json(clientes);
});

// Endpoint para crear un nuevo cliente
app.post('/api/clientes', (req, res) => {
  const { productos, valorAcumulado } = req.body;

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
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
