import express from 'express';
import {
    createUsuario,
    getUsuarios,
    getUsuarioById,
    updateUsuario,
    deleteUsuario
} from '../services/userService.js';
import bcrypt from 'bcrypt'; // Asegúrate de importar bcrypt
import jwt from 'jsonwebtoken'; // Asegúrate de importar jsonwebtoken

const router = express.Router();
const JWT_SECRET = 'FFF1102'; // Cambia esto por una clave segura

// Crear un nuevo usuario
export const create = async (req, res) => {
    try {
        const { username, password, role, localId } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10); // Hashea la contraseña
        const nuevoUsuario = await createUsuario(username, hashedPassword, role, localId);
        res.status(201).json(nuevoUsuario);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el usuario' });
    }
};

// Obtener todos los usuarios
export const getAll = async (req, res) => {
    try {
        const usuarios = await getUsuarios();
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los usuarios' });
    }
};

// Obtener un usuario por ID
export const getById = async (req, res) => {
    try {
        const usuario = await getUsuarioById(req.params.id);
        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.json(usuario);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el usuario' });
    }
};

// Actualizar un usuario
export const update = async (req, res) => {
    try {
        const actualizado = await updateUsuario(req.params.id, req.body);
        if (!actualizado) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.json(actualizado);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el usuario' });
    }
};

// Eliminar un usuario
export const remove = async (req, res) => {
    try {
        const eliminado = await deleteUsuario(req.params.id);
        if (!eliminado) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.status(204).send(); // No content
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el usuario' });
    }
};


// Función para manejar el inicio de sesión
export const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const usuarios = await getUsuarios(); // Espera a que se obtengan los usuarios
        const usuario = usuarios.find(u => u.username === username);

        if (!usuario) {
            return res.status(401).json({ error: 'Usuario no encontrado' });
        }

        const isMatch = await bcrypt.compare(password, usuario.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Contraseña incorrecta' });
        }

        const token = jwt.sign({ id: usuario._id, role: usuario.role }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ message: 'Inicio de sesión exitoso', token });
    } catch (error) {
        console.error('Error en el login:', error); // Para depuración
        res.status(500).json({ error: 'Error en el servidor' });
    }
};


export default router;
