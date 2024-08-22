import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const CLIENTES_FILE = path.join(__dirname, '..', 'data', 'clientes.json');

export const readClientes = () => {
  if (!fs.existsSync(CLIENTES_FILE)) {
    throw new Error('El archivo de clientes no existe');
  }
  const data = fs.readFileSync(CLIENTES_FILE, 'utf-8');
  return JSON.parse(data);
};

export const saveClientes = (clientes) => {
  fs.writeFileSync(CLIENTES_FILE, JSON.stringify(clientes, null, 2));
};
