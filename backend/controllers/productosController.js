import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { getCategorias, createCategoria, getProductos, createProducto } from '../services/productosService.js'; // Ajusta la ruta según la ubicación de tus servicios

const router = express.Router();

// Obtén la ruta del archivo actual y construye la ruta al directorio de imágenes
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuración de multer para manejar la carga de archivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Ajusta la ruta al directorio de imágenes
    cb(null, path.resolve(__dirname, '../../public/assets/')); // Usa path.resolve para asegurar la ruta correcta
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

const upload = multer({ storage: storage });

// Obtener todas las categorías
router.get('/', async (req, res) => {
  try {
    const categorias = await getCategorias();
    res.json(categorias);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las categorías' });
  }
});

// Crear una nueva categoría
router.post('/', upload.single('imagen'), async (req, res) => {
  try {
    const { nombre } = req.body;
    const imagen = req.file ? `/assetss/${req.file.filename}` : null; // Asume que la imagen se encuentra en el directorio 'public/assetss'
    const nuevaCategoria = await createCategoria(nombre, imagen);
    res.status(201).json(nuevaCategoria);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la categoría' });
  }
});

// Obtener productos de una categoría específica
router.get('/:id/productos', async (req, res) => {
  try {
    const productos = await getProductos(req.params.id);
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los productos' });
  }
});

// Crear un nuevo producto en una categoría específica
router.post('/:id/productos', async (req, res) => {
  try {
    const { nombre, precio } = req.body;
    const nuevoProducto = await createProducto(req.params.id, nombre, precio);
    res.status(201).json(nuevoProducto);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el producto' });
  }
});

export default router;
