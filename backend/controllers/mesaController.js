// controllers/mesaController.js
import express from "express";
import {
  createMesa,
  getMesas,
  getMesaById,
  updateMesa,
  deleteMesa,
  getMesasByPiso,
} from "../services/mesaService.js";

const router = express.Router();

// Crear una nueva mesa
export const create = async (req, res) => {
  try {
    const { nombre, imagen, piso } = req.body;
    const nuevaMesa = await createMesa(nombre, imagen, piso);
    res.status(201).json(nuevaMesa);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear la mesa" });
  }
};

// Obtener todas las mesas
export const getAll = async (req, res) => {
  try {
    const mesas = await getMesas();
    res.json(mesas);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las mesas" });
  }
};

// Obtener una mesa por ID
export const getById = async (req, res) => {
  try {
    const mesa = await getMesaById(req.params.id);
    if (!mesa) {
      return res.status(404).json({ error: "Mesa no encontrada" });
    }
    res.json(mesa);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener la mesa" });
  }
};

export const getByPiso = async (req, res) => {
  try {
    const mesas = await getMesasByPiso(req.params.pisoId);
    res.json(mesas);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las mesas por piso" });
  }
};

// Actualizar una mesa
export const update = async (req, res) => {
  try {
    const actualizado = await updateMesa(req.params.id, req.body);
    if (!actualizado) {
      return res.status(404).json({ error: "Mesa no encontrada" });
    }
    res.json(actualizado);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar la mesa" });
  }
};

// Eliminar una mesa
export const remove = async (req, res) => {
  try {
    const eliminado = await deleteMesa(req.params.id);
    if (!eliminado) {
      return res.status(404).json({ error: "Mesa no encontrada" });
    }
    res.status(204).send(); // No content
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar la mesa" });
  }
};

export default router;
