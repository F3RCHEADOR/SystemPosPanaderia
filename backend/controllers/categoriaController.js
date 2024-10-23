import { 
    createCategoria, 
    getCategoriasByLocal, 
    getCategoriaById, 
    updateCategoria, 
    deleteCategoria 
  } from '../services/categoriaService.js';
  
  // Crear una nueva categoría
  export const create = async (req, res) => {
    try {
        const { nombre, imagen, localId } = req.body; 
        const nuevaCategoria = await createCategoria(nombre, imagen, localId);
        res.status(201).json(nuevaCategoria);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear la categoría' });
    }
  };
  
  // Obtener todas las categorías de un local
  export const getAllByLocal = async (req, res) => {
    try {
        const localId = req.params.localId;
        const categorias = await getCategoriasByLocal(localId);
        res.json(categorias);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las categorías' });
    }
  };
  
  // Obtener una categoría por ID
  export const getById = async (req, res) => {
    try {
        const categoria = await getCategoriaById(req.params.id);
        if (!categoria) {
            return res.status(404).json({ error: 'Categoría no encontrada' });
        }
        res.json(categoria);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener la categoría' });
    }
  };
  
  // Actualizar una categoría
  export const update = async (req, res) => {
    try {
        const actualizado = await updateCategoria(req.params.id, req.body);
        if (!actualizado) {
            return res.status(404).json({ error: 'Categoría no encontrada' });
        }
        res.json(actualizado);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar la categoría' });
    }
  };
  
  // Eliminar una categoría
  export const remove = async (req, res) => {
    try {
        const eliminado = await deleteCategoria(req.params.id);
        if (!eliminado) {
            return res.status(404).json({ error: 'Categoría no encontrada' });
        }
        res.status(204).send(); // No content
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la categoría' });
    }
  };
  