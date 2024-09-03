import express from 'express';
import cors from 'cors';
import clientesRoutes from './controllers/clientesController.js';
import mesasRoutes from './controllers/mesasController.js'; 
import categoriasRoutes from './controllers/productosController.js'; 
import cajaRoutes from './controllers/cajaController.js';

const app = express();
const PORT = 5000;

// Configuración de middlewares
app.use(cors()); // Habilita CORS para permitir solicitudes desde otros orígenes
app.use(express.json()); // Habilita el análisis de JSON en las solicitudes

// Rutas
app.use('/api/clientes', clientesRoutes); // Rutas para clientes
app.use('/api/mesas', mesasRoutes); // Rutas para mesas
app.use('/api/categorias', categoriasRoutes); // Rutas para categorías y productos
app.use('/api/caja', cajaRoutes);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
