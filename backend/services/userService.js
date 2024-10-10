import User from '../models/User.js'; // Asegúrate de tener este modelo
import bcrypt from 'bcrypt';

// Crear un nuevo usuario
export const createUsuario = async (username, password, role, localId) => {
  const hashedPassword = await bcrypt.hash(password, 10); // Encriptar la contraseña
  const nuevoUsuario = new User({ username, password: hashedPassword, role, localId });
  return await nuevoUsuario.save();
};

// Obtener todos los usuarios
export const getUsuarios = async () => {
  return await User.find();
};

// Obtener un usuario por ID
export const getUsuarioById = async (id) => {
  return await User.findById(id);
};

// Actualizar un usuario
export const updateUsuario = async (id, updatedData) => {
  if (updatedData.password) {
    updatedData.password = await bcrypt.hash(updatedData.password, 10); // Encriptar la nueva contraseña si se actualiza
  }
  return await User.findByIdAndUpdate(id, updatedData, { new: true });
};

// Eliminar un usuario
export const deleteUsuario = async (id) => {
  const usuario = await User.findByIdAndDelete(id);
  return usuario !== null; // Devuelve true si se eliminó
};
