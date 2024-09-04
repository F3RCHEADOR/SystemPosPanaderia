import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Obtén la ruta del archivo actual y construye la ruta al directorio de datos
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PAGOS_FILE = path.join(__dirname, '..', 'data', 'pagos.json');

export const readPagos = () => {
  try {
    const data = fs.readFileSync(PAGOS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error leyendo pagos.json:', error);
    return [];
  }
};

export const savePagos = (pagos) => {
  try {
    fs.writeFileSync(PAGOS_FILE, JSON.stringify(pagos, null, 2));
  } catch (error) {
    console.error('Error guardando pagos.json:', error);
  }
};
