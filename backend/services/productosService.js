import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Obtén la ruta del archivo actual y construye la ruta al archivo de productos
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PRODUCTOS_FILE = path.join(__dirname, '..', 'data', 'productos.json');

// Leer el archivo de productos
const readProductos = () => {
  if (!fs.existsSync(PRODUCTOS_FILE)) {
    throw new Error('El archivo de productos no existe');
  }
  const data = fs.readFileSync(PRODUCTOS_FILE, 'utf-8');
  return JSON.parse(data);
};

// Guardar el archivo de productos
const saveProductos = (productos) => {
  fs.writeFileSync(PRODUCTOS_FILE, JSON.stringify(productos, null, 2));
};

// Obtener todas las categorías
export const getCategorias = () => {
  const data = readProductos();
  return data.categorias;
};

// Crear una nueva categoría
export const createCategoria = (nombre, imagen) => {
  const data = readProductos();
  const nuevaCategoria = {
    id: (data.categorias.length + 1).toString(), // Simplemente incrementa el ID
    nombre,
    imagen, // Guarda la ruta de la imagen
    productos: [] // Inicialmente no tiene productos
  };
  data.categorias.push(nuevaCategoria);
  saveProductos(data);
  return nuevaCategoria;
};

// Obtener productos de una categoría específica
export const getProductos = (categoriaId) => {
  const data = readProductos();
  const categoria = data.categorias.find(c => c.id === categoriaId);
  if (!categoria) {
    throw new Error('Categoría no encontrada');
  }
  return categoria.productos;
};

// Obtener el siguiente ID basado en el máximo ID existente
const getMaxProductId = (productos) => {
  if (productos.length === 0) return 0;
  const ids = productos.map(p => parseInt(p.id.split('-').pop(), 10));
  return Math.max(...ids);
};

// Crear un nuevo producto en una categoría específica
export const createProducto = (categoriaId, nombre, precio) => {
  const data = readProductos();
  const categoria = data.categorias.find(c => c.id === categoriaId);
  if (!categoria) {
    throw new Error('Categoría no encontrada');
  }

  // Obtener el siguiente ID basado en el máximo ID existente
  const maxProductId = getMaxProductId(categoria.productos);
  const newId = `${categoriaId}-${maxProductId + 1}`;

  const nuevoProducto = {
    id: newId,
    nombre,
    precio
  };
  categoria.productos.push(nuevoProducto);
  saveProductos(data);
  return nuevoProducto;
};

// Eliminar un producto específico de una categoría
export const deleteProducto = (categoriaId, productoId) => {
  const data = readProductos();
  const categoria = data.categorias.find(c => c.id === categoriaId);
  if (!categoria) {
    throw new Error('Categoría no encontrada');
  }

  const productoIndex = categoria.productos.findIndex(p => p.id === productoId);
  if (productoIndex === -1) {
    throw new Error('Producto no encontrado');
  }

  categoria.productos.splice(productoIndex, 1);
  saveProductos(data);

  return true; // Retorna verdadero si el producto fue eliminado
};
