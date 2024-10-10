import express from 'express';
import cors from 'cors';
import clientesRoutes from './controllers/clientesController.js';
import mesasRoutes from './controllers/mesasController.js'; 
import categoriasRoutes from './controllers/productosController.js'; 
import cajaRoutes from './controllers/cajaController.js';
import inventarioRoutes from './controllers/inventarioController.js';
import pagosRoutes from './controllers/pagosController.js';
import localRoutes from './routes/localRoutes.js'; // Cambia a rutas
import userRoutes from './routes/userRoutes.js'; // Asegúrate de que las rutas de usuarios estén bien importadas
import mongoose from 'mongoose';

const app = express();
const PORT = process.env.PORT || 5000; // Puerto dinámico

const connectDB = async () => {
  try {
      await mongoose.connect('mongodb+srv://ffonseca1:AYXsdvPeyDX9JXcU@cluster0.owtyb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
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

// Rutas
app.use('/api/clientes', clientesRoutes); // Rutas para clientes
app.use('/api/mesas', mesasRoutes); // Rutas para mesas
app.use('/api/categorias', categoriasRoutes); // Rutas para categorías y productos
app.use('/api/caja', cajaRoutes);
app.use('/api/inventarios', inventarioRoutes); // Corrección aquí
app.use('/api/pagos', pagosRoutes);
app.use('/api/locales', localRoutes); // Rutas para locales
app.use('/api/usuarios', userRoutes); // Rutas para usuarios

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
