import express from "express";
import {
  createPiso,
  getPisos,
  getPisoById,
  updatePiso,
  deletePiso,
  getPisosByLocal,
} from "../services/pisoService.js";

const router = express.Router();

// Crear un nuevo piso
export const create = async (req, res) => {
  try {
    const { nombre, localId } = req.body;
    const nuevoPiso = await createPiso(nombre, localId);
    res.status(201).json(nuevoPiso);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al crear el piso", details: error.message });
  }
};

// Obtener todos los pisos
export const getAll = async (req, res) => {
  try {
    const pisos = await getPisos();
    res.json(pisos);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al obtener los pisos", details: error.message });
  }
};

// Obtener un piso por ID
export const getById = async (req, res) => {
  try {
    const piso = await getPisoById(req.params.id);
    if (!piso) {
      return res.status(404).json({ error: "Piso no encontrado" });
    }
    res.json(piso);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al obtener el piso", details: error.message });
  }
};

// Obtener pisos por local
export const getByLocal = async (req, res) => {
  try {
    const pisos = await getPisosByLocal(req.params.localId);
    res.json(pisos);
  } catch (error) {
    res
      .status(500)
      .json({
        error: "Error al obtener los pisos por local",
        details: error.message,
      });
  }
};

// Actualizar un piso
export const update = async (req, res) => {
  try {
    const actualizado = await updatePiso(req.params.id, req.body);
    if (!actualizado) {
      return res.status(404).json({ error: "Piso no encontrado" });
    }
    res.json(actualizado);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al actualizar el piso", details: error.message });
  }
};

// Eliminar un piso
export const remove = async (req, res) => {
  try {
    const eliminado = await deletePiso(req.params.id);
    if (!eliminado) {
      return res.status(404).json({ error: "Piso no encontrado" });
    }
    res.status(204).send(); // No content
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al eliminar el piso", details: error.message });
  }
};

export default router;
