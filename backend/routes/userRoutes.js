import express from 'express';
import { create, getAll, getById, update, remove, login } from '../controllers/userController.js';

import authenticateToken from '../middlewares/auth.js'; // Importa el middleware

const router = express.Router();

// Crear un nuevo usuario
router.post('/', create);

// Obtener todos los usuarios
router.get('/', getAll);

// Obtener un usuario por ID
router.get('/:id', getById);

// Actualizar un usuario
router.put('/:id', update);

// Eliminar un usuario
router.delete('/:id', remove);

// Loguear usuario
router.post('/login', login); 

export default router;
