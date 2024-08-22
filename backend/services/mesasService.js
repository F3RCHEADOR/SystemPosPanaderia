import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Obtén la ruta del archivo actual y construye la ruta al directorio de datos
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const MESAS_FILE = path.join(__dirname, '..', 'data', 'mesas.json');

export const readMesas = () => {
  if (!fs.existsSync(MESAS_FILE)) {
    throw new Error('El archivo de mesas no existe');
  }
  const data = fs.readFileSync(MESAS_FILE, 'utf-8');
  return JSON.parse(data);
};

export const saveMesas = (mesas) => {
  fs.writeFileSync(MESAS_FILE, JSON.stringify(mesas, null, 2));
};
