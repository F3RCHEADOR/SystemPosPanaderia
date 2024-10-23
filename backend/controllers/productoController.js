import { 
    createProducto, 
    getProductosByLocal, 
    getProductosByCategory, 
    getProductoById, 
    updateProducto, 
    deleteProducto 
} from '../services/productosService.js';

// Crear un nuevo producto
export const create = async (req, res) => {
    try {
        const { nombre, precio, iva, categoriaId, localId } = req.body;
        const nuevoProducto = await createProducto(nombre, precio, iva, categoriaId, localId);
        res.status(201).json(nuevoProducto);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el producto' });
    }
};


// Obtener todos los productos de una Categoria
export const getAllByCategory = async (req, res) => {
    try {
        const categoriaId = req.params.categoriaId; // Ahora se obtiene desde los parámetros
        const productos = await getProductosByCategory(categoriaId);
        res.json(productos);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
};


// Obtener todos los productos de un local
export const getAllByLocal = async (req, res) => {
    try {
        const localId = req.params.localId; // Cambiar a req.query
        const productos = await getProductosByLocal(localId);
        res.json(productos);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
};


// Obtener un producto por ID
export const getById = async (req, res) => {
    try {
        const producto = await getProductoById(req.params.id);
        if (!producto) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        res.json(producto);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el producto' });
    }
};

// Actualizar un producto
export const update = async (req, res) => {
    try {
        const actualizado = await updateProducto(req.params.id, req.body);
        if (!actualizado) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        res.json(actualizado);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el producto' });
    }
};

// Eliminar un producto
export const remove = async (req, res) => {
    try {
        const eliminado = await deleteProducto(req.params.id);
        if (!eliminado) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        res.status(204).send(); // No content
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el producto' });
    }
};
