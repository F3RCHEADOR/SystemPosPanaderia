import * as clienteService from '../services/clienteService.js';
import express from 'express';

const router = express.Router();

// Crear un nuevo cliente
export const crearCliente = async (req, res) => {
    try {
        const { nombre, productos, localId } = req.body;
        const nuevoCliente = await clienteService.createCliente(nombre, productos, localId);
        res.status(201).json(nuevoCliente);
    } catch (error) {
        console.error('Error al crear cliente:', error);
        res.status(500).json({ message: 'Error al crear cliente' });
    }
};

// Obtener todos los clientes de un local
export const obtenerClientesPorLocal = async (req, res) => {
    try {
        const { localId } = req.params;
        const clientes = await clienteService.getClientesByLocal(localId);
        res.status(200).json(clientes);
    } catch (error) {
        console.error('Error al obtener clientes:', error);
        res.status(500).json({ message: 'Error al obtener clientes' });
    }
};

// Obtener un cliente por ID
export const obtenerClientePorId = async (req, res) => {
    try {
        const { id } = req.params;
        const cliente = await clienteService.getClienteById(id);
        if (!cliente) {
            return res.status(404).json({ message: 'Cliente no encontrado' });
        }
        res.status(200).json(cliente);
    } catch (error) {
        console.error('Error al obtener cliente:', error);
        res.status(500).json({ message: 'Error al obtener cliente' });
    }
};

// Actualizar un cliente
export const actualizarCliente = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;
        const clienteActualizado = await clienteService.updateCliente(id, updatedData);
        if (!clienteActualizado) {
            return res.status(404).json({ message: 'Cliente no encontrado' });
        }
        res.status(200).json(clienteActualizado);
    } catch (error) {
        console.error('Error al actualizar cliente:', error);
        res.status(500).json({ message: 'Error al actualizar cliente' });
    }
};

// Eliminar un cliente
export const eliminarCliente = async (req, res) => {
    try {
        const { id } = req.params;
        const eliminado = await clienteService.deleteCliente(id);
        if (!eliminado) {
            return res.status(404).json({ message: 'Cliente no encontrado' });
        }
        res.status(204).send(); // No content
    } catch (error) {
        console.error('Error al eliminar cliente:', error);
        res.status(500).json({ message: 'Error al eliminar cliente' });
    }
};

export default router;