import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Obtén la ruta del archivo actual y construye la ruta al archivo de registros
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REGISTROS_FILE = path.join(__dirname, '..', 'data', 'inventarios.json');

// Leer el archivo de registros
const readRegistros = () => {
  if (!fs.existsSync(REGISTROS_FILE)) {
    fs.writeFileSync(REGISTROS_FILE, JSON.stringify([], null, 2));
  }
  const data = fs.readFileSync(REGISTROS_FILE, 'utf-8');
  return JSON.parse(data);
};

// Guardar el archivo de registros
const saveRegistros = (registros) => {
  fs.writeFileSync(REGISTROS_FILE, JSON.stringify(registros, null, 2));
};

// Obtener todos los registros
export const getRegistros = () => {
  const data = readRegistros();
  return data;
};

// Crear un nuevo registro con un ID autoincremental
export const createRegistro = (empresa, fecha, hora, productos, costoTotal) => {
  const data = readRegistros();
  
  // Determina el nuevo ID (el último ID + 1)
  const nuevoId = data.length > 0 ? data[data.length - 1].codigo + 1 : 1;
  
  const nuevoRegistro = {
    codigo: nuevoId,
    empresa,
    fecha,
    hora,
    productos,
    costoTotal
  };
  
  data.push(nuevoRegistro);
  saveRegistros(data);
  return nuevoRegistro;
};
