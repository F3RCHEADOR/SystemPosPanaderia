import express from 'express';
import cors from 'cors';
import clientesRoutes from './controllers/clientesController.js';
import mesasRoutes from './controllers/mesasController.js'; 
import categoriasRoutes from './routes/categoriaRoutes.js'; // Rutas para categorías
import productosRoutes from './routes/productosRoutes.js'; // Rutas para productos
import cajaRoutes from './controllers/cajaController.js';
import inventarioRoutes from './controllers/inventarioController.js';
import pagosRoutes from './controllers/pagosController.js';
import localRoutes from './routes/localRoutes.js'; // Rutas para locales
import userRoutes from './routes/userRoutes.js'; // Rutas para usuarios
import mongoose from 'mongoose';

const app = express();
const PORT = process.env.PORT || 5000; // Puerto dinámico

const connectDB = async () => {
  try {
      await mongoose.connect('mongodb+srv://ffonseca1:AYXsdvPeyDX9JXcU@cluster0.owtyb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
      console.log('Conectado a MongoDB');
  } catch (error) {
      console.error('Error de conexión a MongoDB:', error.message);
      process.exit(1);
  }
};

connectDB();

// Configuración de middlewares
app.use(cors()); // Habilita CORS para permitir solicitudes desde otros orígenes
app.use(express.json()); // Habilita el análisis de JSON en las solicitudes
app.use(express.urlencoded({ extended: true })); // Habilita el análisis de datos de formularios

// Rutas
app.use('/api/clientes', clientesRoutes); // Rutas para clientes
app.use('/api/mesas', mesasRoutes); // Rutas para mesas
app.use('/api/categorias', categoriasRoutes); // Rutas para categorías
app.use('/api/productos', productosRoutes); // Rutas para productos
app.use('/api/caja', cajaRoutes); // Rutas para caja
app.use('/api/inventarios', inventarioRoutes); // Rutas para inventarios
app.use('/api/pagos', pagosRoutes); // Rutas para pagos
app.use('/api/locales', localRoutes); // Rutas para locales
app.use('/api/usuarios', userRoutes); // Rutas para usuarios

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
