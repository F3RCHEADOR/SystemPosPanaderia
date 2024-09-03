import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Obtén la ruta del archivo actual y construye la ruta al archivo de cajas
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const CAJAS_FILE = path.join(__dirname, '..', 'data', 'cajas.json');

// Leer el archivo de cajas
const readCajas = () => {
  if (!fs.existsSync(CAJAS_FILE)) {
    fs.writeFileSync(CAJAS_FILE, JSON.stringify([], null, 2));
  }
  const data = fs.readFileSync(CAJAS_FILE, 'utf-8');
  return JSON.parse(data);
};

// Guardar el archivo de cajas
const saveCajas = (cajas) => {
  fs.writeFileSync(CAJAS_FILE, JSON.stringify(cajas, null, 2));
};

// Obtener todas las cajas
export const getCajas = () => {
  const data = readCajas();
  return data;
};

// Crear una nueva caja con un ID autoincremental
export const createCaja = (tipoCaja, fecha, hora, tipoMoneda, totalCaja) => {
  const data = readCajas();
  
  // Determina el nuevo ID (el último ID + 1)
  const nuevoId = data.length > 0 ? data[data.length - 1].id + 1 : 1;
  
  const nuevoRegistro = {
    id: nuevoId,
    tipoCaja,
    fecha,
    hora,
    tipoMoneda,
    totalCaja
  };
  
  data.push(nuevoRegistro);
  saveCajas(data);
  return nuevoRegistro;
};
