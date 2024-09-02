import express from 'express';
const router = express.Router();
import { getCategorias, createCategoria, getProductos, createProducto } from '../services/productosService.js'; // Ajusta la ruta según la ubicación de tus servicios

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
router.post('/', async (req, res) => {
  try {
    const { nombre, imagen } = req.body;
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
