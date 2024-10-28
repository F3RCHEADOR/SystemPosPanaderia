import express from 'express';
import cors from 'cors';
import clientesRoutes from './routes/clienteRoutes.js';
import categoriasRoutes from './routes/categoriaRoutes.js';
import productosRoutes from './routes/productosRoutes.js';
import pagosRoutes from './routes/pagosRoutes.js';
import localRoutes from './routes/localRoutes.js';
import userRoutes from './routes/userRoutes.js';
import cajaRoutes from './routes/cajaRoutes.js';
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
app.use('/api/clientes', clientesRoutes);
app.use('/api/categorias', categoriasRoutes);
app.use('/api/productos', productosRoutes);
app.use('/api/pagos', pagosRoutes)
app.use('/api/locales', localRoutes);
app.use('/api/usuarios', userRoutes);   
app.use('/api/cajas', cajaRoutes);

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
